const auth = {
    usersKey: 'pomato_users',
    sessionKey: 'pomato_current_user',

    getUsers: function() {
        const users = localStorage.getItem(this.usersKey);
        return users ? JSON.parse(users) : {};
    },

    saveUsers: function(users) {
        localStorage.setItem(this.usersKey, JSON.stringify(users));
    },

    signup: function(userData) {
        const users = this.getUsers();
        if (users[userData.email]) {
            return false; // User already exists
        }
        users[userData.email] = {
            name: userData.name,
            password: userData.password,
            addresses: []
        };
        this.saveUsers(users);
        return true;
    },

    login: function(email, password) {
        const users = this.getUsers();
        const user = users[email];
        if (user && user.password === password) {
            localStorage.setItem(this.sessionKey, email);
            return true;
        }
        return false;
    },

    logout: function() {
        localStorage.removeItem(this.sessionKey);
    },

    getCurrentUser: function() {
        const email = localStorage.getItem(this.sessionKey);
        if (!email) return null;
        const users = this.getUsers();
        return { email, ...users[email] };
    },

    isAuthenticated: function() {
        return localStorage.getItem(this.sessionKey) !== null;
    },

    saveAddress: function(address) {
        const email = localStorage.getItem(this.sessionKey);
        if (!email) return false;
        const users = this.getUsers();
        users[email].addresses.push(address);
        this.saveUsers(users);
        return true;
    }
};

window.auth = auth;
