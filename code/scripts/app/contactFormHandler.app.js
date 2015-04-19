var request = require('superagent');

var CONTACT_FORM_ID = "contact-form";


var utils = {
  forEachChild: function(domElement, callback) {
    var results = [];
    for (var i=0; i < domElement.children.length; i++ ) {
      results.push(callback(domElement.children[i]));
    }
    return results;
  },
  formElement: function() {
    return document.getElementById(CONTACT_FORM_ID);
  }
}

var attachHandler = function(options) {
  var validations = options.validations || {};
  var preSendHook = options.preSendHook || (function() {});
  var postSendHook = options.postSendHook || (function() {});

  var requestData = {
    email: null,
    subject: null,
    body: null
  };

  var otherData = {}

  var findInputForName = function(name) {
    var result = null;

    utils.forEachChild(utils.formElement(), function(childEl) {
      if (childEl.getAttribute('name') == name) {
        result = childEl;
      }
    });

    return result;
  }

  var clientValidate = function(domElement) {
    if (Object.keys(validations).indexOf(domElement.name) !== -1) {
      var message = validations[domElement.name](domElement);
      if (message) {
        addError(domElement, message);
        return message;
      }
    }
    return null;
  }

  var scrapeForData = function(domElement) {
    if (Object.keys(requestData).indexOf(domElement.name) !== -1) {
      requestData[domElement.name] = domElement.value;
    } else {
      otherData[domElement.name] = domElement.value;
    }
  };

  var clearFields = function() {
    utils.forEachChild(utils.formElement(), function(childEl) {
      if (childEl.getAttribute('name')) childEl.value = '';
    });
  };

  var clearErrors = function() {
    utils.forEachChild(utils.formElement(), function(childEl) {
      if (childEl.getAttribute('name') && /erroneous/.test(childEl.className)) {
        clearError(childEl);
      }
    });
  };

  var clearError = function(focusEvent) {
    var domEl = focusEvent.target;
    domEl.className = domEl.className.replace(/\berroneous\b/,'');
    domEl.parentNode.removeChild(domEl.nextSibling);
  }

  var addError = function(domEl, message) {
    if (/erroneous/.test(domEl.className)) return;

    var errorEl = document.createElement("SPAN");
    errorEl.className = "error";
    domEl.className += " erroneous";
    errorEl.appendChild(document.createTextNode(message));
    domEl.parentNode.insertBefore(errorEl, domEl.nextSibling);

    domEl.addEventListener('focus', clearError);
  };

  var showErrors = function(errors) {
    for (var key in errors) {
      var domEl = findInputForName(key);
      if (domEl) addError(domEl, errors[key]);
    }
  }

  var handleSendEmailResponse = function(err, response) {
    if (err) return showErrors(err.response.body.errors);

    clearErrors();
    clearFields();

    postSendHook();
  };

  var onFormSubmit = function(submitEvent) {
    submitEvent.preventDefault();

    var errorStrings = utils.forEachChild(utils.formElement(), clientValidate);
    if (errorStrings.join('').length) return;
    
    utils.forEachChild(utils.formElement(), scrapeForData);
    preSendHook(requestData, otherData);
    
    request.post('http://leaf-api.herokuapp.com/v1/contact')
      .send({message:requestData})
      .end(handleSendEmailResponse);
  };

  window.onload = function() {
    document.getElementById(CONTACT_FORM_ID).addEventListener('submit', onFormSubmit);
  };
};


attachHandler({
  validations: {
    name: function(input) {
      if (!input.value) return "Must be provided."
    },
    email: function(input) {
      if (!input.value) return "Must be a valid email.";
    },
    body: function(input) {
      if (!input.value) return "Must be provided.";
    }
  },
  preSendHook: function(requestData, otherData) {
    requestData.subject = "New contact from " + otherData.name;
    if (requestData.body) {
      requestData.body += ("\n\n Budget: " + otherData.budget);
    }
  },
  postSendHook: function() {
    alert("Thanks, we've received your message and will get back to you shortly.");
  }
});