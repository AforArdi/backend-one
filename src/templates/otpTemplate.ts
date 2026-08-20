export const otpTemplate = (otp: string, expiryTime: number = 10): string => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
</head>
<body>
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>OTP Verification Code For Rise Together</h2>
        <p>Hello,</p>
        <p>You requested an OTP to verify your identity. Please use the following code:</p>
        <p style="font-size: 24px; font-weight: bold; margin: 20px 0;">${otp}</p>
        <p>This code will expire in ${expiryTime} minutes.</p>
        <p>If you did not request this OTP, please ignore this email.</p>
        <p>Best regards,<br>Rise Together</p>
    </div>
</body>
</html>
    `;
};