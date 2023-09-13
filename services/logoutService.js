async function logout(req, res) {
    req.session.destroy();
    res.json({
        msg: "see you again",
    });
}

module.exports = {logout}
