from flask import Flask, request, jsonify, session
import mysql.connector as mysql
from flask_cors import CORS
from flask_session import Session

import traceback

app = Flask(__name__)

# ✅ Secure session settings
app.secret_key = "your_secret_key"
app.config["SESSION_TYPE"] = "filesystem"  # Stores session on the server
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_USE_SIGNER"] = True
app.config["SESSION_COOKIE_HTTPONLY"] = True  # Prevent JavaScript from accessing cookies
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"  # ✅ Required for cross-origin requests
app.config["SESSION_COOKIE_SECURE"] = False  # ❌ Set to True if using HTTPS

Session(app)  # ✅ Enable Flask-Session

# ✅ CORS setup to allow frontend requests and credentials (cookies)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)


# Error handling
@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal Server Error", "details": traceback.format_exc()}), 500

# Database connection
def get_db_connection():
    return mysql.connect(host="localhost", user="root", password="mysql", database="jr")

@app.route('/register', methods=['POST'])
def register():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        data = request.get_json()  # Accept JSON from React
        name = data.get('name')
        username = data.get('username')
        user_type = data.get('user_type')
        password = data.get('password')

        if not all([name, username, user_type, password]):
            return jsonify({"error": "All fields are required"}), 400

        # Check if username already exists
        cursor.execute("SELECT COUNT(*) AS count FROM User WHERE Username = %s", (username,))
        if cursor.fetchone()["count"] > 0:
            return jsonify({"error": "Username already exists!"}), 409

        # Insert into User table
        sql = "INSERT INTO User (Name, Username, UserType, Password) VALUES (%s, %s, %s, %s)"
        values = (name, username, user_type, password)
        cursor.execute(sql, values)
        conn.commit()

        user_id = cursor.lastrowid  # Get the newly created user's ID
        session['user_id'] = user_id
        session['user_type'] = user_type

        # Debugging: Print session to check if it's being set
        print("Session:", session)


        # Send response with appropriate redirection path
        redirect_url = "/register_employer" if user_type == "Employer" else "/register_employee"

        if not user_type:
            print("Error: user_type is missing or None!")
        else:
            print(f"user_type received: {user_type}")


        print(f"Redirect url: {redirect_url}")  # Use f-string to avoid syntax issues


        return jsonify({
            "message": "User registered successfully!",
            "user_id": user_id,
            "user_type": user_type,
            "redirect": redirect_url  # Frontend will use this to redirect
        }), 201

    except mysql.connector.Error as err:
        return jsonify({"error": f"Database error: {err}"}), 500

    finally:
        cursor.close()
        conn.close()


@app.route('/register_employer', methods=['POST'])
def register_employer():
    print("Session before checking:", session) 
    if 'user_id' not in session or session.get('user_type') != "Employer":
        return jsonify({"error": "Unauthorized access"}), 401
    print("here")
    data = request.json  # Get JSON data from React
    user_id = session['user_id']
    name_of_poc = data.get('name_of_poc')
    contact_info = data.get('contact_info')
    no_of_openings = 0
    print(data)
    conn = get_db_connection()
    cursor = conn.cursor()

    sql = "INSERT INTO Employer (ID, NameOfPOC, ContactInfo, NoOfOpenings) VALUES (%s, %s, %s, %s)"
    values = (user_id, name_of_poc, contact_info, no_of_openings)

    try:
        cursor.execute(sql, values)
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Employer profile completed! You can now log in.", "redirect": "/login"}), 200
    except mysql.connector.Error as err:
        return jsonify({"error": f"Database error: {err}"}), 500

@app.route('/register_employee', methods=['POST'])
def register_employee():
    print("here")
    if 'user_id' not in session or session.get('user_type') != "Employee":
        return jsonify({"error": "Unauthorized access"}), 401

    data = request.json  # Get JSON data from React
    user_id = session['user_id']
    resume = data.get('resume')
    email = data.get('email')
    status = "Active"

    conn = get_db_connection()
    cursor = conn.cursor()

    sql = "INSERT INTO Employee (ID, Resume, Email, Status) VALUES (%s, %s, %s, %s)"
    values = (user_id, resume, email, status)

    try:
        cursor.execute(sql, values)
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Employee profile completed! You can now log in.", "redirect": "/login"}), 200
    except mysql.connector.Error as err:
        return jsonify({"error": f"Database error: {err}"}), 500


@app.route("/login", methods=["POST"])
def login():
   # print("Request Content-Type:", request.content_type)  # Debugging

    # Parse JSON request
    #if request.is_json:
    #    data = request.get_json()
    #else:
    #    data = json.loads(request.data.decode("utf-8"))  # Handle non-JSON requests

    data = request.get_json(force=True)

    

    if not data or "username" not in data or "password" not in data:
        return jsonify({"error": "Missing username or password"}), 400
    
    print("Received Data:", data)  # Debugging

    username = data["username"]
    password = data["password"]

    # Connect to DB and fetch user details
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT ID, UserType, Password FROM User WHERE Username = %s", (data["username"],))
    user = cursor.fetchone()
    db.close()

    print("Fetched User:", user)  # Debugging

    if user and user["Password"] == password:
        session["user_id"] = user["ID"]
        session["user_type"] = user["UserType"]
        print("Session after setting:", session) 

        # Determine redirection path based on user type
        redirect_url = "/employee_dashboard" if user["UserType"] == "Employee" else "/employer_dashboard"

        return jsonify({"message": "Login successful", "user_type": user["UserType"], "redirect": redirect_url}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401
    

@app.route('/admin_login', methods=['POST'])
def admin_login():
    print("Request received at /admin_login")

       
    if not request.is_json:
        print("Error: Request is not JSON")
        return jsonify({"error": "Invalid request, expected JSON"}), 400

    data = request.get_json()
    print("Received Data:", data)  # Debugging log

       
    if "admin_username" not in data or "admin_password" not in data:
        print("Error: Missing required fields")
        return jsonify({"error": "Missing username or password"}), 400

    admin_username = data.get("admin_username")
    admin_password = data.get("admin_password")
    
    #print(admin_username,admin_password)
    ADMIN_USERNAME="admin"   
    ADMIN_PASSWORD = "123"
    #printf(admin_user)
    if admin_username == ADMIN_USERNAME and admin_password == ADMIN_PASSWORD:
        session["user_id"] = 0
        session["user_type"] = "admin"
        #print(session["username"])
        return jsonify({"message": "Admin login successful!", "redirect": "/admin_dashboard"}), 200

    print("Error: Invalid credentials")
    return jsonify({"error": "Invalid admin credentials!"}), 401

@app.route('/check_session', methods=['GET'])
def check_session():
    return jsonify(session)


@app.route('/admin_dashboard', methods=['GET'])
def admin_dashboard():
    #if 'user_id' not in session or session.get('user_type') != "admin":
     #   return jsonify({"error": "Unauthorized access!"}), 403
    print("here")

    conn = get_db_connection()
    cursor = conn.cursor()

    # Fetching statistics
    cursor.execute("SELECT COUNT(*) FROM User")
    total_users = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM User WHERE UserType = 'Recruiter'")
    total_recruiters = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM User WHERE UserType = 'Employee'")
    total_candidates = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM Job")
    total_jobs = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM Job WHERE Status = 'Open'")
    open_jobs = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM Application")
    total_applications = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM Interview WHERE Status = 'Scheduled'")
    scheduled_interviews = cursor.fetchone()[0]

    cursor.execute("SELECT Complaint_ID, Description, Status FROM Complaint ORDER BY Complaint_ID DESC LIMIT 5")
    recent_complaints = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify({
        "totalUsers": total_users,  # Match frontend keys
        "totalRecruiters": total_recruiters,
        "totalCandidates": total_candidates,
        "totalJobs": total_jobs,
        "openJobs": open_jobs,
        "totalApplications": total_applications,
        "scheduledInterviews": scheduled_interviews,
        "recentComplaints": [{"id": c[0], "text": c[1], "status": c[2]} for c in recent_complaints]  # Match 'text' instead of 'description'
    })

    

@app.route('/employer_dashboard', methods=['GET'])
def employer_dashboard():
    print("session:",session)
    if 'user_id' not in session or session.get('user_type') != 'Employer':
        return jsonify({"error": "Unauthorized access"}), 403  # Return JSON error
    print(session)
    return jsonify({"message": "Welcome to the Employer Dashboard"}), 200  # Return JSON success response



# Employee Dashboard Route
@app.route('/employee_dashboard', methods=['GET'])
def employee_dashboard():
    print("session:",session)
    if 'username' not in session or session.get('user_type') != 'Employee':
        return jsonify({"error": "Unauthorized access"}), 403

    


@app.route('/view_applicants', methods=['GET'])
def view_applicants():
    print("session:",session)
    if 'username' not in session or session.get('user_type') != 'Employer':
        flash("Unauthorized access!", "danger")
        return redirect(url_for('index'))

    conn = get_db_connection()
    cursor = conn.cursor()

    emp_id = session.get('user_id')

    # Fetch only jobs that have at least one applicant
    cursor.execute("""
        SELECT J.job_id AS job_id, J.title AS job_title, U.ID AS cand_id, U.Name AS cand_name
        FROM Job J
        JOIN Application A ON J.Job_ID = A.Job_ID
        JOIN Employee E ON A.User_ID = E.ID
        JOIN User U ON E.ID = U.ID
        WHERE J.Emp_ID = %s
        ORDER BY J.title, U.Name;
    """, (emp_id,))

    results = cursor.fetchall()
    cursor.close()
    conn.close()

    # Grouping candidates by job
    jobs_with_candidates = {}
    for job_id, job_title, cand_id, cand_name in results:
        if job_id not in jobs_with_candidates:
            jobs_with_candidates[job_id] = {
                'title': job_title,
                'candidates': []
            }
        jobs_with_candidates[job_id]['candidates'].append({'id': cand_id, 'name': cand_name})

    # Return the results as a JSON response
    return jsonify(jobs=jobs_with_candidates)

# Logout Route
@app.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"message": "Logged out successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)
