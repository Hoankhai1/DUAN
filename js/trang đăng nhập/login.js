$(document).ready(function() {
    checkLoggedInUser();
  
    $('#registerForm').submit(function(event) {
      event.preventDefault();
  
      var firstname = $('#firstname').val();
      var lastname = $('#lastname').val();
      var email = $('#email').val();
      var password = $('#password').val();
      $('#firstnameOutput').text(firstname);
  
      if (checkExistingUser(email)) {
        $('#message').text('Tên người dùng đã tồn tại. Vui lòng chọn tên người dùng khác.');
        return;
      }
  
      saveUser(email, password, firstname, lastname);
  
      $('#email').val('');
      $('#password').val('');
      $('#message').text('Đăng kí thành công! Vui lòng đăng nhập để tiếp tục.');
    });
  
    $('#loginForm').submit(function(event) {
      event.preventDefault();
  
      var email = $('#loginemail').val();
      var password = $('#loginPassword').val();
  
      if (!checkExistingUser(email)) {
        $('#message2').text('Tên người dùng không tồn tại. Vui lòng kiểm tra lại.');
        return;
      }
  
      if (!checkPassword(email, password)) {
        $('#message2').text('Mật khẩu không đúng. Vui lòng kiểm tra lại.');
        return;
      }
      $('#message2').text('Đăng nhập thành công!');
  
      saveLoggedInUser(email);
      showLoggedInUser(email);
    });
  
    $('a[href="/"]').click(function() {
  
  
      // Hiển thị giao diện khi người dùng đăng xuất
      showLoggedOutUser();
    });
  });
  
  function checkLoggedInUser() {
    if (localStorage.getItem('loggedInUser')) {
        var loggedInUser = localStorage.getItem('loggedInUser');
        showLoggedInUser(loggedInUser);
        // Lấy dữ liệu firstname từ localStorage và cập nhật vào thẻ <span>
        var firstname = localStorage.getItem('firstname');
        $('#firstnameOutput').text(firstname);
      } else {
        showLoggedOutUser();
    }
  }
  
  function saveLoggedInUser(email) {
    localStorage.setItem('loggedInUser', email);
  }
  
  function removeLoggedInUser() {
    localStorage.removeItem('loggedInUser');
  }
  
  function showLoggedInUser(email) {
    $('#loggedInUser').text(email);
    $('#navbar').show();
    $('#nav-name').show();
    $('#btn-hide').hide();
    $('#authModal').modal('hide');
  }
  
  function showLoggedOutUser() {
    $('#loggedInUser').text('');
    $('#navbar').hide();
    $('#nav-name').hide();
    $('#btn-hide').show();
  }
  
  function checkExistingUser(email) {
    if (localStorage.getItem('users')) {
      var users = JSON.parse(localStorage.getItem('users'));
      return users.hasOwnProperty(email);
    }
  
    return false;
  }
  
  function saveUser(email, password, firstname) {
    if (localStorage.getItem('users')) {
      var users = JSON.parse(localStorage.getItem('users'));
    } else {
      var users = {};
    }
  
    users[email] = {
      password: password
    };
  
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('firstname', firstname); // Lưu tên đầy đủ vào localStorage
  }
  
  
  
  function checkPassword(email, password) {
    if (localStorage.getItem('users')) {
      var users = JSON.parse(localStorage.getItem('users'));
  
      if (users.hasOwnProperty(email) && users[email].password === password) {
        return true;
      }
    }
  
    return false;
  }