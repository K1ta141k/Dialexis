# LexiDrom API Documentation

## Overview

LexiDrom is a sophisticated text comparison and analysis service built with FastAPI. This document provides detailed information about all internal API endpoints, request/response schemas, and usage examples.

## Base URL

- **Development**: `http://localhost:8000`
- **Production**: `https://your-deployed-service.run.app`

## Authentication

Most endpoints support optional authentication via JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## API Endpoints

### 1. Health Checks

#### GET `/`
**Basic health check**

**Response:**
```json
{
  "message": "LexiDrom Text Comparison API",
  "version": "1.0.0",
  "status": "running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### GET `/health`
**Detailed health status**

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "services": {
    "supabase": "available",
    "activity_tracker": "available",
    "race_dataset": "available"
  }
}
```

### 2. Authentication Endpoints

#### POST `/auth/google`
**Google OAuth authentication**

**Request Body:**
```json
{
  "id_token": "google-id-token-string"
}
```

**Response:**
```json
{
  "access_token": "jwt-token-string",
  "token_type": "bearer",
  "expires_in": 3600
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid Google token
- `500 Internal Server Error`: Authentication failed

#### POST `/auth/refresh`
**Refresh JWT token**

**Headers:**
```
Authorization: Bearer <current-jwt-token>
```

**Response:**
```json
{
  "access_token": "new-jwt-token-string",
  "token_type": "bearer",
  "expires_in": 3600
}
```

#### GET `/auth/me`
**Get current user info**

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "picture": "https://example.com/avatar.jpg"
}
```

### 3. Text Comparison Endpoints

#### POST `/compare-texts/`
**Main text comparison endpoint**

**Request Body:**
```json
{
  "original_text": "The original text to compare against",
  "summary_text": "The user's summary text",
  "reading_mode": "detailed"
}
```

**Reading Modes:**
- `skimming`: Quick overview focusing on main ideas
- `comprehension`: Understanding check and verification
- `study`: Educational focus with detailed analysis
- `review`: Revision and retention focus
- `summary`: Summary generation and evaluation
- `detailed`: Comprehensive analysis (default)
- `critical`: Analysis and evaluation of arguments
- `comparison`: Compare multiple texts or versions

**Response:**
```json
{
  "accuracy_score": 85,
  "correct_points": [
    "Correctly identified the main theme",
    "Accurately captured key arguments"
  ],
  "missed_points": [
    "Missed important supporting evidence",
    "Did not mention the conclusion"
  ],
  "wrong_points": [
    "Incorrect interpretation of the data"
  ],
  "tracking_status": "tracked"
}
```

**Error Responses:**
- `400 Bad Request`: Invalid request body
- `500 Internal Server Error`: Comparison failed

#### POST `/compare-texts/public`
**Public text comparison endpoint (no authentication required)**

**Request Body:**
```json
{
  "original_text": "The original text to compare against",
  "summary_text": "The user's summary text",
  "reading_mode": "detailed"
}
```

**Response:** Same as main endpoint

### 4. Activities Endpoints

#### GET `/activities/user/{user_id}`
**Get user activities**

**Parameters:**
- `user_id` (path): User identifier

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "activities": [
    {
      "id": "activity-uuid",
      "user_email": "user@example.com",
      "activity_type": "text_comparison",
      "timestamp": "2024-01-15T10:30:00.000Z",
      "details": {
        "accuracy_score": 85,
        "reading_mode": "detailed"
      }
    }
  ],
  "total": 1
}
```

#### POST `/activities/log`
**Log new activity**

**Request Body:**
```json
{
  "user_email": "user@example.com",
  "activity_type": "text_comparison",
  "details": {
    "accuracy_score": 85,
    "reading_mode": "detailed"
  }
}
```

**Response:**
```json
{
  "success": true,
  "activity_id": "activity-uuid"
}
```

#### GET `/activities/analytics`
**Get activity analytics**

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "total_activities": 150,
  "average_accuracy": 78.5,
  "most_used_mode": "detailed",
  "recent_activity": [
    {
      "date": "2024-01-15",
      "count": 5,
      "average_score": 82.3
    }
  ]
}
```

### 5. Random Text Endpoints

#### GET `/random-text/race`
**Get random RACE dataset text**

**Query Parameters:**
- `min_length` (optional): Minimum text length (default: 100)
- `max_length` (optional): Maximum text length (default: 2000)
- `count` (optional): Number of texts to return (default: 1)

**Response:**
```json
{
  "texts": [
    {
      "text": "The passage from the RACE dataset...",
      "source": "train",
      "id": "race-12345",
      "length": 450
    }
  ],
  "dataset_info": {
    "is_loaded": true,
    "total_articles": 27827,
    "dataset_name": "RACE (Reading Comprehension from Examinations)"
  }
}
```

#### GET `/random-text/custom`
**Get custom random text**

**Query Parameters:**
- `length` (optional): Desired text length (default: 500)
- `topic` (optional): Topic for text generation

**Response:**
```json
{
  "text": "Generated custom text based on parameters...",
  "length": 500,
  "topic": "science"
}
```

## Data Models

### TextComparisonRequest
```json
{
  "original_text": "string (required)",
  "summary_text": "string (required)",
  "reading_mode": "string (optional, default: 'detailed')"
}
```

### TextComparisonResponse
```json
{
  "accuracy_score": "integer (0-100)",
  "correct_points": ["array of strings"],
  "missed_points": ["array of strings"],
  "wrong_points": ["array of strings"],
  "tracking_status": "string ('tracked', 'failed', 'not_tracked')"
}
```

### GoogleLoginRequest
```json
{
  "id_token": "string (required)"
}
```

### Token
```json
{
  "access_token": "string",
  "token_type": "string",
  "expires_in": "integer"
}
```

### User
```json
{
  "email": "string",
  "name": "string (optional)",
  "picture": "string (optional)"
}
```

### Activity
```json
{
  "id": "string",
  "user_email": "string",
  "activity_type": "string",
  "timestamp": "datetime",
  "details": "object",
  "ip_address": "string (optional)",
  "user_agent": "string (optional)"
}
```

## Error Responses

### Standard Error Format
```json
{
  "detail": "Error message description"
}
```

### Common HTTP Status Codes

- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Authentication required or failed
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `422 Unprocessable Entity`: Validation error
- `500 Internal Server Error`: Server error

## Rate Limiting

Currently, no rate limiting is implemented. Consider implementing rate limiting for production use.

## CORS Configuration

The API supports CORS for the following origins:
- `http://localhost:3000`
- `http://localhost:8000`
- `http://localhost:5173`
- `https://your-production-domain.com`

## Testing

### Using curl

**Health Check:**
```bash
curl -X GET "http://localhost:8000/"
```

**Text Comparison:**
```bash
curl -X POST "http://localhost:8000/compare-texts/" \
  -H "Content-Type: application/json" \
  -d '{
    "original_text": "The original text",
    "summary_text": "The summary",
    "reading_mode": "detailed"
  }'
```

**Authenticated Request:**
```bash
curl -X GET "http://localhost:8000/auth/me" \
  -H "Authorization: Bearer your-jwt-token"
```

### Using Python requests

```python
import requests

# Health check
response = requests.get("http://localhost:8000/")
print(response.json())

# Text comparison
data = {
    "original_text": "The original text",
    "summary_text": "The summary",
    "reading_mode": "detailed"
}
response = requests.post("http://localhost:8000/compare-texts/", json=data)
print(response.json())
```

## Service Dependencies

### Required Services

1. **Supabase Manager**
   - Handles database connections
   - Manages user data and activities
   - Provides real-time database operations

2. **Activity Tracker**
   - Logs user activities
   - Tracks text comparison results
   - Provides analytics data

3. **Text Comparison Service**
   - Performs AI-powered text analysis
   - Uses Google's Gemma-3n model
   - Provides fallback to simple comparison

4. **RACE Dataset Service**
   - Loads educational text dataset
   - Provides random text generation
   - Manages dataset caching

### Service Health Checks

Each service provides availability status:
- `available`: Service is working correctly
- `unavailable`: Service is not available
- `unknown`: Service status cannot be determined

## Monitoring and Logging

### Log Levels
- `INFO`: General application information
- `WARNING`: Non-critical issues
- `ERROR`: Critical errors that need attention
- `DEBUG`: Detailed debugging information

### Key Metrics
- Request response times
- Error rates by endpoint
- Service availability
- Database connection status
- AI model availability

## Security Considerations

1. **JWT Token Security**
   - Tokens expire after 30 minutes
   - Use HTTPS in production
   - Store JWT secret securely

2. **Input Validation**
   - All inputs validated with Pydantic
   - SQL injection protection via Supabase
   - XSS protection through proper encoding

3. **CORS Configuration**
   - Restrict origins to trusted domains
   - Configure for production environment

4. **Environment Variables**
   - Store sensitive data securely
   - Use Google Secret Manager in production
   - Never commit secrets to version control

## Performance Considerations

1. **Database Optimization**
   - Use connection pooling
   - Implement proper indexing
   - Monitor query performance

2. **AI Model Optimization**
   - Cache model responses when possible
   - Implement fallback mechanisms
   - Monitor API usage and costs

3. **Caching Strategy**
   - Cache frequently accessed data
   - Implement Redis for session storage
   - Cache RACE dataset in memory

## Troubleshooting

### Common Issues

1. **Authentication Failures**
   - Verify Google OAuth credentials
   - Check JWT secret configuration
   - Ensure proper token format

2. **Database Connection Issues**
   - Verify Supabase credentials
   - Check network connectivity
   - Monitor connection pool status

3. **AI Model Issues**
   - Verify Google API key
   - Check API quotas and limits
   - Monitor model availability

4. **Performance Issues**
   - Monitor memory usage
   - Check CPU utilization
   - Review database query performance

### Debug Commands

```bash
# Check service health
curl -X GET "http://localhost:8000/health"

# Test text comparison
curl -X POST "http://localhost:8000/compare-texts/" \
  -H "Content-Type: application/json" \
  -d '{"original_text":"test","summary_text":"test"}'

# Check logs
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=lexidrom"
```

## Version History

- **v1.0.0**: Initial API release
- **v1.1.0**: Added activity tracking
- **v1.2.0**: Enhanced text comparison with AI
- **v1.3.0**: Added RACE dataset integration

## Support

For API-related issues:
1. Check the health endpoint for service status
2. Review application logs for error details
3. Verify environment variable configuration
4. Test with minimal request data
5. Contact development team with specific error messages 