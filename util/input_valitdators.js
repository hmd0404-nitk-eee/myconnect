module.exports.validateRegisterCredentials = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {};

    if(username.trim() === '') {
        errors.username = 'Username cannot be empty!';
    }

    if(password.trim() === '') {
        errors.password = 'Password cannot be empty!';
    } else if (password.trim() !== confirmPassword.trim()) {
        errors.confirmPassword = 'Passwords must match!';
    }
    
    if(email.trim() === '') {
        errors.email = 'Email Address cannot be empty!';
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if(!email.match(regEx)) {
            errors.email = 'Invalid Email Address!'
        }
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
};

module.exports.validateLoginCredentials = (
    username,
    password
) => {
    const errors = {};

    if(username.trim() === '') {
        errors.username = 'Username cannot be empty!';
    }

    if(password.trim() === '') {
        errors.password = 'Password cannot be empty!';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
};

module.exports.validatePost = (
    postBody
) => {
    const errors = {};

    if(postBody.trim() === '') {
        errors.postBody = 'Post cannot be empty!'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
};

module.exports.validateComment = (
    commentBody
) => {
    const errors = {};

    if(commentBody.trim() === '') {
        errors.commentBody = 'Comment cannot be empty!'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
};