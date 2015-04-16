var request = require('superagent');

var CONTACT_FORM_ID = "contact-form";

var attachHandler = function() {
  var requestData = {
    email: null,
    subject: "New contact!" ,
    body: null
  };

  var findInputForName = function(name) {
    var formEl = document.getElementById(CONTACT_FORM_ID);

    for (var i=0; i < formEl.children.length; i++ ) {
      var formChildEl = formEl.children[i]

      if (formChildEl.getAttribute('name') == name) {
        return formChildEl;
      }
    }

    return null;
  }

  var addToRequestData = function(domElement) {
    if (Object.keys(requestData).indexOf(domElement.name) !== -1) {
      requestData[domElement.name] = domElement.value;
    }
  };

  var clearFields = function() {
    var formEl = document.getElementById(CONTACT_FORM_ID);

    for (var i=0; i < formEl.children.length; i++ ) {
      var formChildEl = formEl.children[i]

      if (formChildEl.getAttribute('name')) {
        formChildEl.value = '';
      }
    }
  };

  var clearErrors = function() {
    var formEl = document.getElementById(CONTACT_FORM_ID);

    for (var i=0; i < formEl.children.length; i++ ) {
      var formChildEl = formEl.children[i]

      if (formChildEl.getAttribute('name') && /erroneous/.test(formChildEl.className)) {
        clearError(formChildEl);
      }
    }
  };

  var clearError = function(focusEvent) {
    var domEl = focusEvent.target;
    domEl.className = domEl.className.replace(/\berroneous\b/,'');
    domEl.parentNode.removeChild(domEl.nextSibling);
  }

  var showErrors = function(errors) {
    for (var key in errors) {
      var domEl = findInputForName(key);

      if (!domEl || /erroneous/.test(domEl.className)) continue;

      var errorEl = document.createElement("SPAN");
      errorEl.className = "error";
      domEl.className += " erroneous";
      errorEl.appendChild(document.createTextNode(errors[key]));
      domEl.parentNode.insertBefore(errorEl, domEl.nextSibling);

      domEl.addEventListener('focus', clearError);
    }
  }

  var handleSendEmailResponse = function(err, response) {
    if (err) return showErrors(err.response.body.errors);

    clearErrors();
    clearFields();

    alert("Success!");
  };

  var attemptSendEmail = function() {
    request.post('http://leaf-api.herokuapp.com/v1/contact')
      .send({message:requestData})
      .end(handleSendEmailResponse);
  };

  var onFormSubmit = function(submitEvent) {
    submitEvent.preventDefault();
    var formChildren = submitEvent.target.children;

    for (var i=0; i < formChildren.length; i++ ) {
      addToRequestData(formChildren[i]);
    }

    attemptSendEmail();
  };

  window.onload = function() {
    document.getElementById(CONTACT_FORM_ID).addEventListener('submit', onFormSubmit);
  };
};

attachHandler();