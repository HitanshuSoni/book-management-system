const checkHealth = async function (req, res) {
     try {
        return res
      .status(200)
      .send({ status: true, message: "Server Health Is Good." });
   } catch (error) {
    return res.status(500).send({ status: false, message: err.message });
   }

}

module.exports = {checkHealth}