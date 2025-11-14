// Example 1
const foo = async (req, res) => {
    const { bp } = req.params;
    try {
        // ruleid: javascript-063-Lack-Of-Data-Validation-PathTraversal
        let response = await axios.get(`${process.env.AUT_URL}/asdas/${bp}`);
    } catch (error) {
        console.log(error)
    }
};

// EXAMPLE 2
const foo = async (req, res) => {
    const { username,password } = req.params;

    try {
        // ruleid: javascript-063-Lack-Of-Data-Validation-PathTraversal
        const response = await axiosMonitorV1.post(`${FOO_URL}/login/${username}/focuspocus`, {
            username,
            password
        }
      );
    } catch (error) {
        console.log(error)
    }
}
