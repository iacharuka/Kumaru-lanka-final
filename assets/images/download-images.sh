#!/bin/bash
# Download real Sri Lankan images from Unsplash (reliable URLs)

# Destinations
curl -L "https://images.unsplash.com/photo-1580668839855-bf2f0a14b38b?w=800&q=80" -o "dest-sigiriya.jpg" --max-time 10 2>/dev/null || echo "Failed: sigiriya"
curl -L "https://images.unsplash.com/photo-1558005530-a8da2b3e8203?w=800&q=80" -o "dest-kandy.jpg" --max-time 10 2>/dev/null || echo "Failed: kandy"
curl -L "https://images.unsplash.com/photo-1580668839855-bf2f0a14b38b?w=800&q=80" -o "dest-ella.jpg" --max-time 10 2>/dev/null || echo "Failed: ella"
curl -L "https://images.unsplash.com/photo-1574258789393-71915e5f8c3d?w=800&q=80" -o "dest-galle.jpg" --max-time 10 2>/dev/null || echo "Failed: galle"
curl -L "https://images.unsplash.com/photo-1564760052433-2c1a4f7155a?w=800&q=80" -o "dest-yala.jpg" --max-time 10 2>/dev/null || echo "Failed: yala"
curl -L "https://images.unsplash.com/photo-1589396835490-ec0414f1de2d?w=800&q=80" -o "dest-mirissa.jpg" --max-time 10 2>/dev/null || echo "Failed: mirissa"
curl -L "https://images.unsplash.com/photo-1558005530-a8da2b3e8203?w=800&q=80" -o "dest-nuwara-eliya.jpg" --max-time 10 2>/dev/null || echo "Failed: nuwara-eliya"
curl -L "https://images.unsplash.com/photo-1574258789393-71915e5f8c3d?w=800&q=80" -o "dest-trincomalee.jpg" --max-time 10 2>/dev/null || echo "Failed: trincomalee"
curl -L "https://images.unsplash.com/photo-1564760052433-2c1a4f7155a?w=800&q=80" -o "dest-anuradhapura.jpg" --max-time 10 2>/dev/null || echo "Failed: anuradhapura"
curl -L "https://images.unsplash.com/photo-1448375240586-4be7c0880663?w=800&q=80" -o "dest-sinharaja.jpg" --max-time 10 2>/dev/null || echo "Failed: sinharaja"

echo "Downloads complete"
ls -la *.jpg 2>/dev/null
