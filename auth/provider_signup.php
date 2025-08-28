<html>
<head>
  <title>Job Provider Sign-Up</title>
  <link rel="stylesheet" href="signup.css">
</head>
<body>
  <div class="signup-container">
    <h2>Job Provider Registration</h2>
    <form action="../backend/register_provider.php" method="POST">
      <label for="companyname">Company / Provider Name</label>
      <input type="text"  name="company_name"id="companyname"placeholder="Techcrop" required>

      <label for="email">Email</label>
      <input type="email" id="email" name="email" placeholder="vsfjhsfh@gmal.com">

      <label for="phone">Phone Number</label>
      <input type="tel" id="phone"name="contact_number" placeholder="3758270.....">

      <label for="address">Address</label>
      <textarea id="address" name="address" rows="2"placeholder="K.T road,tirupati....." required></textarea>

      <label for="jobrole">Job Roles Offered</label>
      <input type="text" id="jobrole" placeholder="Manager">

      <label for="location">Job Location</label>
      <input type="text" id="location"placeholder="tirupati" name="location" required>

      <label for="password">Password</label>
      <input type="password" id="password" name="pass" required>

      <button type="submit" name="submit">Sign Up</button>
    </form>
    <p>Already have an account? <a href="provider_login.html">Login</a></p>
  </div>
      <nav class="navbar">
    <div class="nav-logo">PartTimeConnect</div>
    <ul class="nav-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="feedback.html">Feedback</a></li>
    </ul>
    </nav>
</body>
</html>
