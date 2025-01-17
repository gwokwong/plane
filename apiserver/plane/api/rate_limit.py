from django.utils import timezone
from rest_framework.throttling import SimpleRateThrottle


class ApiKeyRateThrottle(SimpleRateThrottle):
    scope = 'api_key'

    def get_cache_key(self, request, view):
        # Retrieve the API key from the request header
        api_key = request.headers.get('X-Api-Key')
        if not api_key:
            return None  # Allow the request if there's no API key

        # Use the API key as part of the cache key
        return f'{self.scope}:{api_key}'

    def allow_request(self, request, view):
        # Calculate the current time as a Unix timestamp
        now = timezone.now().timestamp()

        # Use the parent class's method to check if the request is allowed
        allowed = super().allow_request(request, view)

        if allowed:
            # Calculate the remaining limit and reset time
            history = self.cache.get(self.key, [])

            # Remove old histories
            while history and history[-1] <= now - self.duration:
                history.pop()
            
            # Calculate the requests
            num_requests = len(history)

            # Check available requests
            available = self.num_requests - num_requests

            # Unix timestamp for when the rate limit will reset
            reset_time = int(now + self.duration)

            # Add headers
            request.META['X-RateLimit-Remaining'] = max(0, available)
            request.META['X-RateLimit-Reset'] = reset_time

        return allowed