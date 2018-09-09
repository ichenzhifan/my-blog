$(function () {
   var $loginBox = $('#loginBox');
   var $registerBox = $('#registerBox');
   var $userInfo = $('#userInfo');

   // 切换到注册页面.
   $loginBox.find('a').on('click', function () {
     $registerBox.removeClass('hide');
     $loginBox.addClass('hide');
   });

   // 切换到登陆页面.
  $registerBox.find('a').on('click', function () {
	  $registerBox.addClass('hide');
	  $loginBox.removeClass('hide');
  });

  $userInfo.find('#logout').on('click', function () {
	  $.ajax({
		  url: '/api/user/logout',
		  success: function () {
			  window.location.reload();
		  }
	  })
  });

  $loginBox.find('button').on('click', function () {
	  $.ajax({
		  type: 'post',
		  url: "/api/user/login",
		  data: {
		  	username: $loginBox.find('[name="username"]').val(),
			  password: $loginBox.find('[name="password"]').val()
		  },
		  dataType: 'json',
		  success: function (result) {
				if(result.code !== 200){
					$loginBox.find('.colWarning').html(result.message);
					$loginBox.find('input').val('');
					return;
				}

				window.location.reload();
		  }
	  });
  });

  // 注册
	$registerBox.find('button').on('click', function () {
		$.ajax({
			type: 'post',
			url: '/api/user/register',
			data: {
				username: $registerBox.find('[name="username"]').val(),
				password: $registerBox.find('[name="password"]').val(),
				repassword: $registerBox.find('[name="repassword"]').val()
			},
			dataType: 'json',
			success: function (result) {
				if(result.code !== 200){
					$registerBox.find('.colWarning').html(result.message);
					return;
				}

				window.location.reload();
			}
		});
	});
});