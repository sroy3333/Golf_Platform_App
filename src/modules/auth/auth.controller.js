import jwt from "jsonwebtoken";
import { supabase } from "../../config/db.js";
import { emailApi } from "../../config/brevo.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  if (!password || password.length < 6) {
    return res.status(400).json({ message: "Password too short" });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    if (error.message.includes("User already registered")) {
      return res.status(400).json({
        message: "Email already exists. Please login instead."
      });
    }
    return res.status(400).json({ message: error.message });
  }

  await supabase.from("users").insert([
    { id: data.user.id, email, name, role: "user" }
  ]);

  res.json({ message: "User created" });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Supabase authentication
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return res.status(401).json({
        message: error.message
      });
    }

    // Fetch user profile
    const { data: profile } = await supabase
      .from("users")
      .select("*")
      .eq("id", data.user.id)
      .single();

    // Generate JWT
    const token = jwt.sign(
      {
        id: data.user.id,
        role: profile.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: profile
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({
      message: "Login failed"
    });
  }
};
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) {
    return res.status(404).json({ message: "User not found" });
  }

  // 🔐 create reset token
  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  try {
    await emailApi.sendTransacEmail({
      sender: {
        email: process.env.SENDER_EMAIL,
        name: "Golf Platform"
      },
      to: [{ email }],
      subject: "Reset Your Password",
      htmlContent: `
        <h2>Password Reset</h2>
        <p>Click below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link expires in 15 minutes.</p>
      `
    });

    res.json({ message: "Reset email sent" });

  } catch (err) {
    console.error("BREVO ERROR:", err.response?.body || err.message || err);
    res.status(500).json({ message: err.message });
  }
};

export const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  if (!password || password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const hashed = await bcrypt.hash(password, 10);

    await supabase
      .from("users")
      .update({ password: hashed })
      .eq("id", decoded.id);

    res.json({ message: "Password updated" });

  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};