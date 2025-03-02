const bcrypt = require("bcrypt");

async function hashPassword() {
    const password = "Apple";
	const hash = await bcrypt.hash(password, 10);
    
    if(await bcrypt.compare("Apple", hash)) {
        console.log("Password is correct");
    } else {
        console.log("Password is incorrect");
    }
}

hashPassword();
