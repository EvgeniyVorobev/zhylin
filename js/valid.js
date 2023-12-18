$(document).ready(function () {

  // Custom method to validate username
  $.validator.addMethod("usernameRegex", function(value, element) {
    return this.optional(element) || regex_first_last_name.test(value);
  }, "Name must be more than 2 characters long, without special characters or spaces");

  $.validator.addMethod("lastusernameRegex", function(value, element) {
    return this.optional(element) || regex_first_last_name.test(value);
  }, "Last name must be more than 2 characters long, without special characters or spaces");

  $.validator.addMethod("passwordRegex", function(value, element) {
    return this.optional(element) || /[a-z]/.test(value) && /[0-9]/.test(value) && /[A-Z]/.test(value) && /^[0-9A-Za-z]+$/.test(value);
  }, 'Password must be between 8-12 characters in length, including letters (A-Z, a-z) and numbers (0-9). Without any special symbols (^@()#*+/\"?!=.{}~`&) and spaces');

  $.validator.addMethod("phoneRegex", function(value, element) {
    return this.optional(element) || /^(\d[- ]?){7,11}$/.test(value);
  }, "The phone must be from 7 to 11 characters, without special characters");



  $(function () {
    var form = $("#myform")
    form.validate({
      onfocusout: function (element) {
        if(this.currentElements.length != 0 && this.currentElements[0].name == "email"){
          rebuidEmail($(this.currentElements[0]))
        }
        this.element(element);
        $(element).valid()
      },
      onkeyup: function (element) {
        $('[name="' + element.name + '"]').val(element.value);
        $(element).valid()
      },

      rules: {
        first_name: {
          required: true,
          usernameRegex: true,
          minlength: 2,
          maxlength: 60,
        },
        last_name: {
          required: true,
          lastusernameRegex: true,
          minlength: 2,
          maxlength: 60,
        },
        password: {
          required: true,
          passwordRegex: true,
          minlength: 8,
          maxlength: 12,
        },
        email: {
          required: true,
          email: true,

        },
        phone: {
          phoneRegex: true,
          required: true,
        }


      },
      messages: {
        first_name: {
          required: "The first name field is required",
          minlength: "The first name must be at least 2",
          maxlength: "First name can be a maximum of 25",
        },

        last_name: {
          required: "The last name field is required",
          minlength: "The last name must be at least 2",
          maxlength: "Surname can be a maximum of 25",
        },
        password: {
          required: "Passordfelt kreves",
          minlength: "Passordet må være minst 8 tegn",
          maxlength: "Passordet kan ikke overstige 12 tegn",
        },
        email: {
          required: "The e-mail field is required",
          email: "The e-mail must be a valid address",
        },
        phone: {
          required: "The phone is required",
        }

      },
      submitHandler: function (form, event) {
        event.preventDefault();
        $('.preloader').show();
        $("input[name='first_name']").each(function () {
          $(this).val($(this).val().substr(0, 60).replace(/[.-]/g, ' ').replace(/\s\s+/g, ' '))
        });
        $("input[name='last_name']").each(function () {
          $(this).val($(this).val().substr(0, 60).replace(/[.-]/g, ' ').replace(/\s\s+/g, ' '))
        });
        var msg = $(form).serialize();
        var linkAdress = makeSendAdress();
        console.log('linkAdress= ' + linkAdress);

        // Send to GoogleSpreedsheets;

        const spreedSheetHandler = 'https://script.google.com/macros/s/AKfycbxurZxliL4PIuFFBqMx3aKz65I8mHZQlaLjr24FnGvsRjhMoA1nA1nMoRisq2RN_dBf/exec';
        $.ajax({
          method: 'post',
          url: spreedSheetHandler,
          data: $('form').serializeArray(),
          success: (d)=>{
            alert('Спасибо, завка добавлена в таблицу');
          },
          error: (d)=>{
            console.log(d);
          }
        })

        $.post(linkAdress, msg)
          .done(function(data) {
            alert_after_gen_pass(form)

            var domainForPixel = $.urlParam('domain');
            if (domainForPixel != null) {
              $('body').prepend('<iframe width="1" height="1" alt="" style="display:none" src="https://' + decodeURIComponent(domainForPixel) + '"></iframe>');
            }
            var obj_data = JSON.parse(data)


            if ($.urlParam('noautologin') == 1) {
              adress_redir = "thanks.html"
              localStorage.setItem("redirect", obj_data.redirect);
              window.location = adress_redir
              return true;
            }
            adress_redir = "thanks.html"
            localStorage.setItem("redirect", obj_data.redirect);
            window.location = adress_redir



            // console.log(data);
          }).fail(function(jqXHR, textStatus, errorThrown) {
          // console.log(jqXHR.status)
          if (jqXHR.status == 400) {
            var obj_data = JSON.parse(jqXHR.responseText)
            for (key in obj_data.errors) {
              if (key == "CROB") {

                window.location = obj_data.errors[key]
              } else {
                alert(obj_data.errors[key])
              }
            }
          } else {
            alert('Register form field error')
            console.log(jqXHR)
          }
          $('.preloader').hide();
          // $('#step_phone').hide();
          // $('#account_information').fadeIn(1000);
        });

      }
    });
    var form2 = $("#myform2")
    form2.validate({
      onfocusout: function (element) {
        if(this.currentElements.length != 0 && this.currentElements[0].name == "email"){
          rebuidEmail($(this.currentElements[0]))
        }
        this.element(element);
        $(element).valid()
      },
      onkeyup: function (element) {
        $('[name="' + element.name + '"]').val(element.value);
        $(element).valid()
      },

      rules: {
        first_name: {
          required: true,
          usernameRegex: true,
          minlength: 2,
          maxlength: 60,
        },
        last_name: {
          required: true,
          lastusernameRegex: true,
          minlength: 2,
          maxlength: 60,
        },
        password: {
          required: true,
          passwordRegex: true,
          minlength: 8,
          maxlength: 12,
        },
        email: {
          required: true,
          email: true,

        },
        phone: {
          phoneRegex: true,
          required: true,
        }


      },
      messages: {
        first_name: {
          required: "The first name field is required",
          minlength: "The first name must be at least 2",
          maxlength: "First name can be a maximum of 25",
        },

        last_name: {
          required: "The last name field is required",
          minlength: "The last name must be at least 2",
          maxlength: "Surname can be a maximum of 25",
        },
        password: {
          required: "Passordfelt kreves",
          minlength: "Passordet må være minst 8 tegn",
          maxlength: "Passordet kan ikke overstige 12 tegn",
        },
        email: {
          required: "The e-mail field is required",
          email: "The e-mail must be a valid address",
        },
        phone: {
          required: "The phone is required",
        }

      },
      submitHandler: function (form, event) {
        event.preventDefault();
        $('.preloader').show();
        $("input[name='first_name']").each(function () {
          $(this).val($(this).val().substr(0, 60).replace(/[.-]/g, ' ').replace(/\s\s+/g, ' '))
        });
        $("input[name='last_name']").each(function () {
          $(this).val($(this).val().substr(0, 60).replace(/[.-]/g, ' ').replace(/\s\s+/g, ' '))
        });
        var msg = $(form).serialize();
        var linkAdress = makeSendAdress();
        console.log('linkAdress= ' + linkAdress);
        $.post(linkAdress, msg)
          .done(function(data) {
            alert_after_gen_pass(form)

            var domainForPixel = $.urlParam('domain');
            if (domainForPixel != null) {
              $('body').prepend('<iframe width="1" height="1" alt="" style="display:none" src="https://' + decodeURIComponent(domainForPixel) + '"></iframe>');
            }
            var obj_data = JSON.parse(data)


            if ($.urlParam('noautologin') == 1) {
              adress_redir = "thanks.html"
              localStorage.setItem("redirect", obj_data.redirect);
              window.location = adress_redir
              return true;
            }
            adress_redir = "thanks.html"
            localStorage.setItem("redirect", obj_data.redirect);
            window.location = adress_redir



            // console.log(data);
          }).fail(function(jqXHR, textStatus, errorThrown) {
          // console.log(jqXHR.status)
          if (jqXHR.status == 400) {
            var obj_data = JSON.parse(jqXHR.responseText)
            for (key in obj_data.errors) {
              if (key == "CROB") {

                window.location = obj_data.errors[key]
              } else {
                alert(obj_data.errors[key])
              }
            }
          } else {
            alert('Register form field error')
            console.log(jqXHR)
          }
          $('.preloader').hide();
          // $('#step_phone').hide();
          // $('#account_information').fadeIn(1000);
        });

      }
    });
  });

});
