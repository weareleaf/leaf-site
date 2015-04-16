var attachHandler = function() {
  var requestData = {
    email: null,
    subject: null,
    body: null
  };

  var addToRequestData = function(domElement) {
    if (Object.keys(requestData).indexOf(domElement.name) !== -1) {
      requestData[domElement.name] = domElement.value;
    }
  };

  var attemptSendEmail = function() {
    console.log(requestData);
  }

  var onFormSubmit = function(submitEvent) {
    submitEvent.preventDefault();
    var formChildren = submitEvent.target.children;

    for (var i=0; i < formChildren.length; i++ ) {
      addToRequestData(formChildren[i]);
    }

    attemptSendEmail();
  };

  window.onload = function() {
    document.getElementById("contact-form").addEventListener('submit', onFormSubmit);
  };
};

attachHandler();