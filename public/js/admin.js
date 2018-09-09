$(function () {
	// 退出.
	var $logout = $('#logout');
	var $addCategoryForm = $('#addCategoryForm');
	var $categoriesTable = $('#categoriesTable');
	var $contentformTable = $('#contentformTable');
	var $editCategoryForm = $('#editCategoryForm');
	var $addContentForm = $('#addContentForm');
	var $editContentForm = $('#editContentForm');

	$logout.on('click', function () {
		$.ajax({
			url: '/api/user/logout',
			success: function () {
				window.location = '/';
			}
		})
	});

	$categoriesTable.find('.remove').on('click', function () {
		const id = $(this).data('id');
		if(id){
			$.ajax({
				url: '/api/category/remove?id=' + id,
				dataType: 'json',
				success: function () {
					window.location.reload();
				}
			})
		}
	});

	$addCategoryForm.find('input').on('input', function () {
		$('.colWarning').html('');
	});

	// 添加分类.
	$addCategoryForm.find('button').on('click', function () {
		$.ajax({
			url: '/api/category/add',
			type: 'post',
			dataType: 'json',
			data: {
				name: $addCategoryForm.find('[name="name"]').val()
			},
			success: function (result) {
				if(result.code === 200){
					window.location = '/admin/category';
				}else {
					$addCategoryForm.find('[name="name"]').val('');
					$('.colWarning').html(result.message);
				}
			}
		});
	});

	$editCategoryForm.find('input').on('input', function () {
		$('.colWarning').html('');
	});

	// 编辑分类.
	$editCategoryForm.find('button').on('click', function () {
		$.ajax({
			url: '/api/category/edit',
			type: 'post',
			data: {
				id: $editCategoryForm.find('[name="name"]').data('id'),
				name: $editCategoryForm.find('[name="name"]').val()
			},
			dataType: 'json',
			success: function (result) {
				if(result.code === 200){
					window.location = '/admin/category';
				}else {
					$editCategoryForm.find('[name="name"]').val('');
					$('.colWarning').html(result.message);
				}
			}
		});
	});

	// 添加内容.
	$addContentForm.find('button').on('click', function () {
		$.ajax({
			url: '/api/content/add',
			type: 'post',
			dataType: 'json',
			data: {
				category: $addContentForm.find('[name="category"]').val(),
				title: $addContentForm.find('[name="title"]').val(),
				description: $addContentForm.find('[name="description"]').val(),
				content: $addContentForm.find('[name="content"]').val(),
			},
			success: function (result) {
				if(result.code === 200){
					window.location = '/admin/content';
				}else {
					$addContentForm.find('[name="title"]').val('');
					$addContentForm.find('[name="description"]').val('');
					$addContentForm.find('[name="content"]').val('');

					$('.colWarning').html(result.message);
				}
			}
		});
	});

	$editContentForm.find('button').on('click', function () {
		$.ajax({
			url: '/api/content/edit',
			type: 'post',
			dataType: 'json',
			data: {
				id: $editContentForm.data('id'),
				category: $editContentForm.find('[name="category"]').val(),
				title: $editContentForm.find('[name="title"]').val(),
				description: $editContentForm.find('[name="description"]').val(),
				content: $editContentForm.find('[name="content"]').val(),
			},
			success: function (result) {
				if(result.code === 200){
					window.location = '/admin/content';
				}else {
					$editContentForm.find('[name="title"]').val('');
					$editContentForm.find('[name="description"]').val('');
					$editContentForm.find('[name="content"]').val('');

					$('.colWarning').html(result.message);
				}
			}
		});
	});

	$contentformTable.find('.remove').on('click', function () {
		const id = $(this).data('id');
		if(id){
			$.ajax({
				url: '/api/content/remove?id=' + id,
				dataType: 'json',
				success: function () {
					window.location.reload();
				}
			})
		}
	});
});