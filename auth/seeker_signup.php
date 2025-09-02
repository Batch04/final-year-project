<html>
<head>
  <title>Job Seeker Sign-Up</title>
<<<<<<< HEAD
  <link rel="stylesheet" href="styles/signup.css">
=======
  <link rel="stylesheet" href="style/signup.css">
>>>>>>> 7bed10a981ff0c8f7b413092af47a48a4b369c0d
</head>
<body>
  <div class="signup-container">
    <h2>Job Seeker Registration</h2>
    <form action="../backend/register_seeker.php" method="POST">
      <label for="fullname">Full Name</label>
      <input type="text" id="fullname" name="name" required placeholder="Vyshnavi Narala">

      <label for="email">Email</label>
      <input type="email" id="email" name="email" placeholder="vyshanvi111@gmail.com">

      <label for="phone">Phone Number</label>
      <input type="tel" id="phone" name="phone" placeholder="03928232...">

      <label for="qualification">Qualification</label>
      <input type="text" id="qualification" placeholder="Graduated from SVU" required>

      <label for="skills">Skills</label>
      <input type="text" id="skills" name="skills"placeholder="programming..." required>

      <label for="location">Preferred Job Location</label>
      <input type="text" id="location" placeholder="kurnool" required>

      <label for="location">Age</label>
      <input type="text" required placeholder="18" name="age">

      <label for="password">Password</label>
      <input type="password" name="pass" id="password"  required>

      <button type="submit" name="submit">Sign Up</button>
    </form>
    <p>Already have an account? <a href="seeker_login.html">Login</a></p>
  </div>
      <nav class="navbar">
    <div class="nav-logo">PartTimeConnect</div>
    <ul class="nav-links">
        <li><a href="../index.html">Home</a></li>
    </ul>
    </nav>
</body>
</html>
