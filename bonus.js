var longestCommonPrefix = function(strs) {

    if (strs.length === 0) {
        return "";
    }

    let prefix = strs[0];

    for (let i = 1; i < strs.length; i++) {

        while (!strs[i].startsWith(prefix)) {
            prefix = prefix.slice(0, -1);

            if (prefix === "") {
                return "";
            }
        }
    }

    return prefix;
};

console.log("the most longest common prefix is" , longestCommonPrefix(["flower","flow","flight"]));
console.log("the prefix is: ", longestCommonPrefix(["dog","racecar","car"])); //empty string
