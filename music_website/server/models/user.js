class User {
    static users = [
        { username: 'user1', password: 'password1' },
        { username: 'user2', password: 'password2' }
    ];

    static findUser(username, password) {
        return this.users.find(u => u.username === username && u.password === password);
    }
}

module.exports = User;
