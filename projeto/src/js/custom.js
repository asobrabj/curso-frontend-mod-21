// instancia jquery e evita conflitos
// jQuery( function($){

$(document).ready(function () {

   /* $('.owl-carousel').owlCarousel();*/
   /* remover o botão <> */
   $('.owl-carousel').owlCarousel({
      items: 1,
      autoplay: true,
      autoplayTimeout: 15000,
      autoplayHoverPause: true,

      loop: true,
      margin: 10,
      responsiveClass: true,
      responsive: {
         0: {
            items: 1,
            nav: false,
            loop: false
         },
         600: {
            items: 3,
            nav: true,
            loop: false
         },
         1000: {
            items: 5,
            nav: true,
            loop: false
         }
      }
   })

   /* botão comprar */
   $('.featured-item a').addClass('btn btn-success stretch-link');
   /* efeito nas imagens destaques - seletor */
   $(".btncomp").on("mouseover", function () {
      $(this).css({
         'color': '#157347',
         'background-color': '#fff',
         'border-color': '#656466'
      });

   }).on("mouseout", function () {
      $(this).css({
         'color': '#fff',
         'background-color': '#157347',
         'border-color': 'none'
      });
   });

   /* faz inclusao de aviso novos lancamentos*/
   $('.launch').append('<span><i>lançamento</i></span>');
   //$('.launch').attr('class', 'lancamento');
   /* adiciona o span de lancamento */
   //$('.lancamento').append('<span><i>lançamento</i></span>');

   /* sem estilo no ul  */
   $('.footer-menu ul').css({
      'list-style': 'none'
   });

   $('.social-icons ul').css({
      'list-style': 'none'
   });


   /* callback imagem(2) hide/show */
   $('.featured-item:nth(1) img').mousemove(function () {
      $(this).hide(1000, function () {

      })
      $(this).show(800, function () {
         $(this).stop(true);
      })


   });

   /* acrescenta 'Esgotado'(2) ao lado do preço */
   $('.featured-item:nth(1)').mouseenter(function () {
      $('.featured-item:nth(1)').find('span').remove();
      $('.featured-item:nth(1)').find('h6').append('</><span> - Esgotado</span>');
   });

   /* callback imagem(5) hide/show */
   $('.featured-item:nth(4) img').mousemove(function () {
      $(this).hide(1000, function () {

      })
      $(this).show(800, function () {
         $(this).stop(true);
      })
   });

   /* acrescenta 'Esgotado'(5) ao lado do preço */
   $('.featured-item:nth(4)').mouseenter(function () {
      $('.featured-item:nth(4)').find('span').remove();
      $('.featured-item:nth(4)').find('h6').append('</><span> - Esgotado</span>');
   });

   /* callback imagem(7) hide/show */
   $('.featured-item:nth(6) img').mousemove(function () {
      $(this).hide(1000, function () {

      })
      $(this).show(800, function () {
         $(this).stop(true);
      })
   });

   /* acrescenta 'Esgotado'(7) ao lado do preço */
   $('.featured-item:nth(6)').mouseenter(function () {
      $('.featured-item:nth(6)').find('span').remove();
      $('.featured-item:nth(6)').find('h6').append('</><span> - Esgotado</span>');
   });

   /* animação do texto destaque com plugin jquery-ui */
   $('.anima_mov').animate(
      { marginLeft: 50 },
      {
         duration: 3000,
         easing: 'easeOutBounce'
      }
   )
   /* animação do texto destaque posicao inicial */
   $('.anima_mov').animate(
      { marginLeft: 0 },
      {
         duration: 2000
      }
   )

   /* animação do rodape footer */
   $("#aque").slideUp()
   $("#aque").slideDown(3000)
   //, 'easeOutElastic' );
   $(".social-icons ul li").slideUp()
   $(".social-icons ul li").slideDown(3000)


   /*
    Ouvinte de eventos .nav-modal-open
   */
   $('.nav-modal-open').on('click', function (e) {

      e.preventDefault();

      let elem = $(this).attr('rel')

      $('.modal-body').html($('#' + elem).html())

      $('.modal-header h5.modal-title').html($(this).text())

      let myModal = new bootstrap.Modal($('#modelId'))

      myModal.show()


   })

   /* tratando formulario e adicionando pluguin mask */
   function validate(elem) {
      if (elem.val() == '') {

         console.log('o campos ' + elem.attr('name') + ' é obrigatorio!')

         elem.parent().find('.text-muted').show()

         elem.addClass('invalid')

         return false

      } else {
         elem.parent().find('.text-muted').hide()
         elem.removeClass('invalid')
      }
   }

   /* valida tipo email */
   
   function ValidateEmail(email) {
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      //var mailformat = /^[a-z0-9]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?/i;
      if (email.value.match(mailformat)) {
        // alert("email valido");
         return true;
      }
      else {
         alert('verificar e-mail inválido!')
         return false;
      }
   }


   $('body').on('submit', '.modal-body .form', function (e) {

      e.preventDefault()

      const inputName = $('#nome')
      const inputEmail = $('#email')

      email_val = document.getElementById('email')
      console.log(email_val.value)
      
      ValidateEmail(email_val)
      

      validate(inputName)
      validate(inputEmail)


      if (inputName.hasClass('invalid') || inputEmail.hasClass('invalid')) {

         console.log('verificar os campos obrigatorios!')
         return false

      } else {

         $(this).submit();
      }

   })

/* linha on blur*/

$('body').on('blur', '#nome', function () {
   validate($(this))
})

$('body').on('blur', '#email', function () {
   validate($(this))
   email_val = document.getElementById('email');
   ValidateEmail(email_val)
})



$('body').on('focus', '#date', function () {
   $(this).datepicker()
})

$('body').on('blur', '#date', function () {
   validate($(this))
   $(this).mask('99/99/9999');
})

$('body').on('blur', '#time', function () {
   validate($(this))
   $(this).mask('99:99');
})

$('body').on('blur', '#cep', function () {
   validate($(this))
   $(this).mask('99999-9999');
})

$('body').on('blur', '#phone', function () {
   validate($(this))
   $(this).mask('(99) 9 9999-999');
})

$('body').on('blur', '#cpf', function () {
   validate($(this))
   $(this).mask('999.999.999-99');
                                                         
})


})


/* https://igorescobar.github.io/jQuery-Mask-Plugin/docs.html */
/*
(document).ready(function(){
  $('.date').mask('00/00/0000');
  $('.time').mask('00:00:00');
  $('.date_time').mask('00/00/0000 00:00:00');
  $('.cep').mask('00000-000');
  $('.phone').mask('0000-0000');
  $('.phone_with_ddd').mask('(00) 0000-0000');
  $('.phone_us').mask('(000) 000-0000');
  $('.mixed').mask('AAA 000-S0S');
  $('.cpf').mask('000.000.000-00', {reverse: true});
  $('.cnpj').mask('00.000.000/0000-00', {reverse: true});
  $('.money').mask('000.000.000.000.000,00', {reverse: true});
  $('.money2').mask("#.##0,00", {reverse: true});
 
*/