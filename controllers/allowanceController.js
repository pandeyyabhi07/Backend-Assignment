import AllowanceRequest from "../models/AllowanceRequest.js";
import User from "../models/User.js";
import transporter from "../config/emailConfig.js";

export const createRequest = async (req, res) => {
  try {
    const { userId, amount, description } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const newRequest = new AllowanceRequest({
      user: userId,
      amount,
      description,
    });

    await newRequest.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "sy192829@gmail.com",  
      subject: `New Allowance Request from ${user.name}`,
      html: `
        <h2>New Travel Allowance Request</h2>
        <p><b>Employee:</b> ${user.name} (${user.email})</p>
        <p><b>Department:</b> ${user.department}</p>
        <p><b>Amount:</b> ₹${amount}</p>
        <p><b>Description:</b> ${description}</p>
        <p><b>Date:</b> ${new Date().toLocaleDateString()}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ msg: "Request created & email sent", request: newRequest });
  } catch (err) {
    console.error("❌ Error in createRequest:", err);
    res.status(500).json({ error: err.message });
  }
};


export const getRequests = async (req, res) => {
  try {
    const requests = await AllowanceRequest.find()
      .populate("user", "name email department"); 
    // 👆 Yeh sirf user ke name, email, department return karega

    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update status
export const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const request = await AllowanceRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete request
export const deleteRequest = async (req, res) => {
  try {
    await AllowanceRequest.findByIdAndDelete(req.params.id);
    res.json({ msg: "Request deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
