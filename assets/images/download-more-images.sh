#!/bin/bash
# Tour images
curl -L "https://images.unsplash.com/photo-1580668839855-bf2f0a14b38b?w=800&q=80" -o "tour-cultural-triangle.jpg" --max-time 10 2>/dev/null
curl -L "https://images.unsplash.com/photo-1580668839855-bf2f0a14b38b?w=800&q=80" -o "tour-ella-adventure.jpg" --max-time 10 2>/dev/null
curl -L "https://images.unsplash.com/photo-1564760052433-2c1a4f7155a?w=800&q=80" -o "tour-safari.jpg" --max-time 10 2>/dev/null
curl -L "https://images.unsplash.com/photo-1589396835490-ec0414f1de2d?w=800&q=80" -o "tour-south-coast.jpg" --max-time 10 2>/dev/null
curl -L "https://images.unsplash.com/photo-1558005530-a8da2b3e8203?w=800&q=80" -o "tour-kandy-nuwara.jpg" --max-time 10 2>/dev/null
curl -L "https://images.unsplash.com/photo-1544551763-46a01356b272?w=800&q=80" -o "tour-island-hopping.jpg" --max-time 10 2>/dev/null
curl -L "https://images.unsplash.com/photo-1546703439-bfe3031526b6?w=800&q=80" -o "tour-colombo-city.jpg" --max-time 10 2>/dev/null
curl -L "https://images.unsplash.com/photo-1464822754618-00f1d5bce8b?w=800&q=80" -o "tour-adams-peak.jpg" --max-time 10 2>/dev/null
curl -L "https://images.unsplash.com/photo-1544161515-4aa15f5c1c63?w=800&q=80" -o "tour-ayurveda.jpg" --max-time 10 2>/dev/null
curl -L "https://images.unsplash.com/photo-1574258789393-7191505f18d3?w=800&q=80" -o "tour-jaffna.jpg" --max-time 10 2>/dev/null
curl -L "https://images.unsplash.com/photo-1448375240586-4be7c0880663?w=800&q=80" -o "tour-rainforest.jpg" --max-time 10 2>/dev/null
curl -L "https://images.unsplash.com/photo-1580668839855-bf2f0a14b38b?w=800&q=80" -o "tour-grand-tour.jpg" --max-time 10 2>/dev/null

# About images
curl -L "https://images.unsplash.com/photo-1522202176988-a122a2a3161?w=800&q=80" -o "about-team.jpg" --max-time 10 2>/dev/null
curl -L "https://images.unsplash.com/photo-1488081300231-8c16c7c4b9b5?w=800&q=80" -o "about-travelers.jpg" --max-time 10 2>/dev/null
curl -L "https://images.unsplash.com/photo-1549315581-f31932c235a4?w=800&q=80" -o "about-vehicle.jpg" --max-time 10 2>/dev/null
curl -L "https://images.unsplash.com/photo-1589396835490-ec0414f1de2d?w=800&q=80" -o "about-landscape.jpg" --max-time 10 2>/dev/null

# Gallery images
curl -L "https://images.unsplash.com/photo-1580668839855-bf2f0a14b38b?w=800&q=80" -o "gallery-sigiriya-portrait.jpg" --max-time 10 2>/dev/null
curl -L "https://images.unsplash.com/photo-1580668839855-bf2f0a14b38b?w=1200&q=80" -o "gallery-ella-landscape.jpg" --max-time 10 2>/dev/null
curl -L "https://images.unsplash.com/photo-1564760052433-2c1a4f7155a?w=1200&q=80" -o "gallery-yala-landscape.jpg" --max-time 10 2>/dev/null
curl -L "https://images.unsplash.com/photo-1589396835490-ec0414f1de2d?w=800&q=80" -o "gallery-mirissa-portrait.jpg" --max-time 10 2>/dev/null
curl -L "https://images.unsplash.com/photo-1558005530-a8da2b3e8203?w=1200&q=80" -o "gallery-tea-landscape.jpg" --max-time 10 2>/dev/null
curl -L "https://images.unsplash.com/photo-1558005530-a8da2b3e8203?w=800&q=80" -o "gallery-kandy-portrait.jpg" --max-time 10 2>/dev/null
curl -L "https://images.unsplash.com/photo-1574258789393-7191505f18d3?w=1200&q=80" -o "gallery-galle-landscape.jpg" --max-time 10 2>/dev/null
curl -L "https://images.unsplash.com/photo-1448375240586-4be7c0880663?w=800&q=80" -o "gallery-waterfall-portrait.jpg" --max-time 10 2>/dev/null
curl -L "https://images.unsplash.com/photo-1589396835490-ec0414f1de2d?w=1200&q=80" -o "gallery-beach-landscape.jpg" --max-time 10 2>/dev/null
curl -L "https://images.unsplash.com/photo-1564760052433-2c1a4f7155a?w=800&q=80" -o "gallery-wildlife-portrait.jpg" --max-time 10 2>/dev/null
curl -L "https://images.unsplash.com/photo-1558005530-a8da2b3e8203?w=1200&q=80" -o "gallery-hills-landscape.jpg" --max-time 10 2>/dev/null
curl -L "https://images.unsplash.com/photo-1522202176988-a122a2a3161?w=800&q=80" -o "gallery-local-portrait.jpg" --max-time 10 2>/dev/null

echo "All images downloaded"
ls -la *.jpg 2>/dev/null | wc -l
