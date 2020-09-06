import sgMail from "@sendgrid/mail";
import express from "express";
import config from "../../config/index.mjs";
import auth from "../../middleware/auth.mjs";

const { FROM, TO, SG_KEY, TEMPLETE_ID, SUBJECT } = config.SMTP_SERVICE;

const router = express.Router();

sgMail.setApiKey(SG_KEY);

/**
 * @route POST api/smtp
 * @desc Post a email
 * @access Private
 */

router.post("/", auth("USER"), async (req, res) => {
  const newMail = {
    to: TO,
    from: FROM,
    templateId: TEMPLETE_ID,
    dynamicTemplateData: {
      subject: SUBJECT,
      phone: req.body.phone, //check fo empty body, mark them req on front end
      address: req.body.address,
      message: req.body.message,
      name: req.body.name,
      email: req.body.email,
    },
  };
  try {
    const mail = await sgMail.send(newMail);
    if (mail) {
      res.status(200).json({ message: "success" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
