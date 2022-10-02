// 슬라이더
$(document).ready(function () {
  $('.slider').bxSlider({
    auto: true,
    slideWidth: 500,
    controls: false
  });
});

// 이메일 예시 보기
$(function () {
  $(".btn-email").click(() => {
    $(".email-example").slideToggle(500);
  });

});

// confetti
$(document).ready(function () {
  let confetti = new Confetti("confetti");
  confetti.setCount(50);
  confetti.setPower(50);
  confetti.setSize(3);
  confetti.setFade(true);
  confetti.destroyTarget(false);
});


// 토글
$(function () {
  $(".toggle-btn").click(function () {
    $(this).next().slideToggle(500);
  });
});

// 제보하기 
(function () {
  // get all data in form and return object
  function getFormData(form) {
    var elements = form.elements;
    var honeypot;

    var fields = Object.keys(elements).filter(function (k) {
      if (elements[k].name === "honeypot") {
        honeypot = elements[k].value;
        return false;
      }
      return true;
    }).map(function (k) {
      if (elements[k].name !== undefined) {
        return elements[k].name;
        // special case for Edge's html collection
      } else if (elements[k].length > 0) {
        return elements[k].item(0).name;
      }
    }).filter(function (item, pos, self) {
      return self.indexOf(item) == pos && item;
    });

    var formData = {};
    fields.forEach(function (name) {
      var element = elements[name];

      // singular form elements just have one value
      formData[name] = element.value;

      // when our element has multiple items, get their values
      if (element.length) {
        var data = [];
        for (var i = 0; i < element.length; i++) {
          var item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(', ');
      }
    });

    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    formData.formGoogleSendEmail
      = form.dataset.email || ""; // no email by default

    return { data: formData, honeypot: honeypot };
  }

  function handleFormSubmit(event) {  // handles form submit without any jquery
    event.preventDefault();           // we are submitting via xhr below
    console.log(event.target);
    var form = event.target;
    var formData = getFormData(form);
    var data = formData.data;

    // If a honeypot field is filled, assume it was done so by a spam bot.
    if (formData.honeypot) {
      return false;
    }

    // disableAllButtons(form);
    var url = form.action;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        form.reset();
        var formElements = form.querySelector(".form-elements")
        if (formElements) {
          console.log(formElements);
          formElements.style.display = "none"; // hide form
        }
        var thankYouMessage = document.querySelector(".thankyou_message");
        if (thankYouMessage) {
          console.log(thankYouMessage);
          thankYouMessage.style.display = "flex";
          alert("메일 전송에 성공했습니다. 확인 후 회신드리겠습니다!");
        }
      }
    };
    // url encode form data for sending as post data
    var encoded = Object.keys(data).map(function (k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    }).join('&');
    xhr.send(encoded);
  }

  function loaded() {
    // bind to the submit event of our form
    var forms = document.querySelectorAll("form.gform");
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", handleFormSubmit, false);
    }
  };
  document.addEventListener("DOMContentLoaded", loaded, false);

  function disableAllButtons(form) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }
})();