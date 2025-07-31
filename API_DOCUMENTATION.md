# 🚀 LexiDash API Documentation

## Overview

LexiDash is a text comparison and analysis API that helps users evaluate their summaries against original texts. The API supports both authenticated users (via Google OAuth) and guest users.

**Base URL**: `http://localhost:8000` (development)  
**API Version**: `1.0.0`

---

## 🔐 Authentication

### **Google OAuth Flow**
1. **Get Login URL**: `GET /auth/google-url`
2. **Login with Token**: `POST /auth/google-login`
3. **Use Bearer Token**: Include `Authorization: Bearer <token>` in headers

### **Guest Access**
- Some endpoints support guest access (no authentication required)
- Guest activities are tracked separately from authenticated users

---

## 📚 API Endpoints

### **🏠 Root Endpoint**

#### `GET /`
**Description**: Health check and API information  
**Authentication**: None  
**Response**:
```json
{
    "message": "LexiDash Text Comparison API",
    "version": "1.0.0",
    "status": "running"
}
```

---

### **🔐 Authentication Endpoints**

#### `GET /auth/google-url`
**Description**: Get Google OAuth login URL  
**Authentication**: None  
**Response**:
```json
{
    "auth_url": "https://accounts.google.com/oauth/authorize?..."
}
```

#### `POST /auth/google-login`
**Description**: Authenticate user with Google ID token  
**Authentication**: None  
**Request Body**:
```json
{
    "id_token": "google_id_token_here"
}
```
**Response**:
```json
{
    "access_token": "jwt_token_here",
    "token_type": "bearer",
    "expires_in": 3600
}
```

#### `GET /auth/me`
**Description**: Get current user information  
**Authentication**: Required (Bearer token)  
**Response**:
```json
{
    "email": "user@example.com",
    "name": "User Name",
    "picture": "https://profile-picture-url.com"
}
```

---

### **📝 Text Comparison Endpoint**

#### `POST /compare-texts`
**Description**: Compare original text with user summary and return analysis  
**Authentication**: Optional (supports both authenticated and guest users)  
**Request Body**:
```json
{
    "original_text": "The complete original text to compare against",
    "summary_text": "User's summary of the original text",
    "reading_mode": "detailed",
    "source": "web",
    "session_id": "unique_session_id",
    "user_agent": "browser_user_agent",
    "ip_address": "192.168.1.1",
    "category": "educational",
    "language": "en",
    "difficulty_level": "medium",
    "tags": ["education", "science"]
}
```

**Request Parameters**:
- `original_text` (required): The complete original text
- `summary_text` (required): User's summary to analyze
- `reading_mode` (optional): Reading mode for analysis
  - Options: `skimming`, `comprehension`, `study`, `review`, `summary`, `detailed`, `critical`, `comparison`
  - Default: `detailed`
- `source` (optional): Source of the request (`web`, `mobile`, `api`)
- `session_id` (optional): Unique session identifier
- `user_agent` (optional): Browser user agent string
- `ip_address` (optional): Client IP address
- `category` (optional): Content category (`educational`, `business`, `personal`, etc.)
- `language` (optional): Content language (default: `en`)
- `difficulty_level` (optional): Content difficulty (`easy`, `medium`, `hard`)
- `tags` (optional): Array of tags for categorization

**Response**:
```json
{
    "accuracy_score": 85,
    "correct_points": [
        "Correctly identified the main theme",
        "Accurately captured key statistics"
    ],
    "missed_points": [
        "Missed the historical context",
        "Did not mention the methodology"
    ],
    "wrong_points": [
        "Incorrectly stated the conclusion",
        "Misinterpreted the data source"
    ],
    "tracking_status": "tracked"
}
```

**Response Fields**:
- `accuracy_score`: Integer (0-100) indicating summary accuracy
- `correct_points`: Array of correctly captured points
- `missed_points`: Array of important points that were missed
- `wrong_points`: Array of incorrect or misleading information
- `tracking_status`: Status of activity tracking (`tracked`, `failed`, `not_tracked`)

---

### **👥 Admin Endpoints**

#### `GET /admin/users`
**Description**: Get all registered users (admin only)  
**Authentication**: Required (Bearer token)  
**Response**:
```json
[
    {
        "email": "user1@example.com",
        "created_at": "2024-01-15T10:30:00Z"
    },
    {
        "email": "user2@example.com",
        "created_at": "2024-01-16T14:20:00Z"
    }
]
```

#### `DELETE /admin/users/{email}`
**Description**: Delete a user (admin only)  
**Authentication**: Required (Bearer token)  
**URL Parameters**:
- `email`: User's email address

**Response**:
```json
{
    "message": "User deleted successfully",
    "deleted_user": "user@example.com"
}
```

---

### **📊 Activity Analytics Endpoints**

#### `GET /activities/user/{email}`
**Description**: Get activities for a specific user  
**Authentication**: Required (Bearer token)  
**URL Parameters**:
- `email`: User's email address

**Response**:
```json
{
    "user_email": "user@example.com",
    "total_activities": 25,
    "activities": [
        {
            "id": 1,
            "activity_type": "text_comparison",
            "accuracy_score": 85,
            "reading_mode": "detailed",
            "created_at": "2024-01-15T10:30:00Z",
            "ip_address": "192.168.1.1",
            "user_agent": "Mozilla/5.0..."
        }
    ]
}
```

#### `GET /activities/guest`
**Description**: Get all guest activities  
**Authentication**: Required (Bearer token)  
**Response**:
```json
{
    "total_guest_activities": 150,
    "activities": [
        {
            "id": 1,
            "activity_type": "text_comparison",
            "accuracy_score": 75,
            "reading_mode": "skimming",
            "created_at": "2024-01-15T10:30:00Z",
            "ip_address": "192.168.1.2",
            "user_agent": "Mozilla/5.0..."
        }
    ]
}
```

#### `GET /activities/stats`
**Description**: Get overall activity statistics  
**Authentication**: Required (Bearer token)  
**Response**:
```json
{
    "total_activities": 500,
    "authenticated_users": 25,
    "guest_activities": 150,
    "average_accuracy": 78.5,
    "most_popular_reading_mode": "detailed",
    "activity_breakdown": {
        "text_comparison": 450,
        "login": 50
    }
}
```

#### `GET /activities/points-analysis`
**Description**: Get detailed analysis of points across all activities  
**Authentication**: Required (Bearer token)  
**Response**:
```json
{
    "total_activities": 500,
    "points_analysis": {
        "correct_points": {
            "total_count": 2500,
            "most_common": [
                {"point": "Main idea captured", "frequency": 150},
                {"point": "Key statistics included", "frequency": 120}
            ]
        },
        "missed_points": {
            "total_count": 800,
            "most_common": [
                {"point": "Historical context", "frequency": 80},
                {"point": "Methodology details", "frequency": 65}
            ]
        },
        "wrong_points": {
            "total_count": 300,
            "most_common": [
                {"point": "Incorrect conclusion", "frequency": 45},
                {"point": "Misinterpreted data", "frequency": 30}
            ]
        }
    }
}
```

#### `GET /activities/user/{email}/points`
**Description**: Get detailed points summary for a specific user  
**Authentication**: Required (Bearer token)  
**URL Parameters**:
- `email`: User's email address

**Response**:
```json
{
    "user_email": "user@example.com",
    "total_activities": 25,
    "points_summary": {
        "correct_points": {
            "total_count": 125,
            "most_common": [
                {"point": "Main idea captured", "frequency": 15},
                {"point": "Key statistics included", "frequency": 12}
            ]
        },
        "missed_points": {
            "total_count": 40,
            "most_common": [
                {"point": "Historical context", "frequency": 8},
                {"point": "Methodology details", "frequency": 6}
            ]
        },
        "wrong_points": {
            "total_count": 15,
            "most_common": [
                {"point": "Incorrect conclusion", "frequency": 3},
                {"point": "Misinterpreted data", "frequency": 2}
            ]
        }
    }
}
```

#### `GET /activities/reading-modes/analytics`
**Description**: Get analytics for reading modes  
**Authentication**: Required (Bearer token)  
**Response**:
```json
{
    "total_activities": 500,
    "reading_modes": {
        "detailed": {
            "count": 200,
            "percentage": 40.0,
            "average_accuracy": 82.5,
            "min_accuracy": 60,
            "max_accuracy": 95
        },
        "skimming": {
            "count": 150,
            "percentage": 30.0,
            "average_accuracy": 65.0,
            "min_accuracy": 40,
            "max_accuracy": 85
        }
    },
    "most_popular_mode": "detailed",
    "highest_accuracy_mode": "critical"
}
```

#### `GET /activities/user/{email}/reading-modes`
**Description**: Get reading mode preferences for a specific user  
**Authentication**: Required (Bearer token)  
**URL Parameters**:
- `email`: User's email address

**Response**:
```json
{
    "user_email": "user@example.com",
    "preferred_mode": "detailed",
    "best_performing_mode": "critical",
    "mode_preferences": {
        "detailed": {
            "count": 10,
            "percentage": 40.0,
            "average_accuracy": 85.0
        },
        "skimming": {
            "count": 8,
            "percentage": 32.0,
            "average_accuracy": 65.0
        }
    }
}
```

---

## 📚 Reading Modes

### **Supported Reading Modes**

| Mode | Description | Use Case |
|------|-------------|----------|
| `skimming` | Quick overview for main ideas | Quick review, preview |
| `comprehension` | Understanding check and verification | Learning assessment |
| `study` | Educational focus with learning objectives | Academic work |
| `review` | Revision and retention focus | Exam preparation |
| `summary` | Summary generation and evaluation | Content summarization |
| `detailed` | Comprehensive analysis of all content | In-depth analysis |
| `critical` | Analysis and evaluation of arguments | Critical thinking |
| `comparison` | Compare multiple texts or versions | Comparative analysis |

---

## 🔧 Error Handling

### **HTTP Status Codes**

| Code | Description |
|------|-------------|
| `200` | Success |
| `400` | Bad Request (invalid parameters) |
| `401` | Unauthorized (invalid/missing token) |
| `403` | Forbidden (insufficient permissions) |
| `404` | Not Found |
| `500` | Internal Server Error |

### **Error Response Format**
```json
{
    "detail": "Error message description"
}
```

### **Common Error Scenarios**

#### **Authentication Errors**
```json
{
    "detail": "Could not validate credentials"
}
```

#### **Validation Errors**
```json
{
    "detail": [
        {
            "loc": ["body", "original_text"],
            "msg": "field required",
            "type": "value_error.missing"
        }
    ]
}
```

#### **Server Errors**
```json
{
    "detail": "Error processing request: AI model unavailable"
}
```

---

## 🚀 Usage Examples

### **JavaScript/TypeScript Examples**

#### **1. Guest Text Comparison**
```javascript
const response = await fetch('http://localhost:8000/compare-texts', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        original_text: "Your original text here",
        summary_text: "Your summary here",
        reading_mode: "detailed",
        category: "educational"
    })
});

const result = await response.json();
console.log('Accuracy Score:', result.accuracy_score);
console.log('Correct Points:', result.correct_points);
```

#### **2. Authenticated Text Comparison**
```javascript
const response = await fetch('http://localhost:8000/compare-texts', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
        original_text: "Your original text here",
        summary_text: "Your summary here",
        reading_mode: "study",
        category: "academic"
    })
});
```

#### **3. Google OAuth Login**
```javascript
// Step 1: Get login URL
const urlResponse = await fetch('http://localhost:8000/auth/google-url');
const { auth_url } = await urlResponse.json();

// Step 2: Redirect user to Google OAuth
window.location.href = auth_url;

// Step 3: After Google redirects back with token
const loginResponse = await fetch('http://localhost:8000/auth/google-login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id_token: googleIdToken
    })
});

const { access_token } = await loginResponse.json();
```

#### **4. Get User Activities**
```javascript
const response = await fetch('http://localhost:8000/activities/user/user@example.com', {
    headers: {
        'Authorization': `Bearer ${accessToken}`
    }
});

const activities = await response.json();
console.log('User Activities:', activities);
```

#### **5. Get Reading Mode Analytics**
```javascript
const response = await fetch('http://localhost:8000/activities/reading-modes/analytics', {
    headers: {
        'Authorization': `Bearer ${accessToken}`
    }
});

const analytics = await response.json();
console.log('Most Popular Mode:', analytics.most_popular_mode);
console.log('Highest Accuracy Mode:', analytics.highest_accuracy_mode);
```

### **cURL Examples**

#### **Guest Text Comparison**
```bash
curl -X POST http://localhost:8000/compare-texts \
  -H "Content-Type: application/json" \
  -d '{
    "original_text": "Your original text here",
    "summary_text": "Your summary here",
    "reading_mode": "detailed"
  }'
```

#### **Authenticated Text Comparison**
```bash
curl -X POST http://localhost:8000/compare-texts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "original_text": "Your original text here",
    "summary_text": "Your summary here",
    "reading_mode": "study"
  }'
```

#### **Get Activity Statistics**
```bash
curl -X GET http://localhost:8000/activities/stats \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📋 Frontend Integration Checklist

### **Essential Features**
- [ ] **Google OAuth Integration**: Implement login flow
- [ ] **Token Management**: Store and refresh JWT tokens
- [ ] **Guest Mode**: Allow unauthenticated text comparison
- [ ] **Reading Mode Selection**: Dropdown for mode selection
- [ ] **Real-time Analysis**: Display accuracy score and points
- [ ] **Activity Tracking**: Show user's activity history
- [ ] **Analytics Dashboard**: Display reading mode preferences

### **Optional Features**
- [ ] **Session Management**: Track user sessions
- [ ] **IP/User Agent Tracking**: For enhanced analytics
- [ ] **Content Categorization**: Tags and difficulty levels
- [ ] **Export Functionality**: Download activity reports
- [ ] **Admin Panel**: User management interface

---

## 🔗 API Base URL Configuration

### **Development**
```javascript
const API_BASE_URL = 'http://localhost:8000';
```

### **Production**
```javascript
const API_BASE_URL = 'https://your-production-domain.com';
```

---

## 📞 Support

For API support and questions:
- **Documentation**: Check this file for endpoint details
- **Testing**: Use the provided test scripts
- **Examples**: See usage examples above
- **Error Handling**: Implement proper error handling for all requests

---

**🎉 Happy Coding!** Your LexiDash API is ready for frontend integration! 🚀 