document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    fetch('users.json')
        .then(response => response.json())
        .then(users => {
            var user = users.find(user => user.username === username && user.password === password);
            if(user) {
                alert('Đăng nhập thành công!');
            } else {
                alert('Tên đăng nhập hoặc mật khẩu không đúng!');
            }
        });
});
