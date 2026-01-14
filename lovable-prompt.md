# Services Page Updates

## Issues to Fix

### 1. Remove Hero Floating Icons
In `src/pages/Services.tsx` (lines 139-154), completely remove the div containing the 4 floating icon badges (Residential, Construction, Yard Waste, Fast Delivery). Delete the entire block that starts with `<div className="pointer-events-none absolute inset-0 z-5 hidden md:block">` and ends with its closing `</div>`.

### 2. Fix Service Card Badge Positioning
The green badge labels on the 3 service type cards need better visual alignment:

**Current issue:** The left-side badges ("Contractor Favorite", "Best for Homeowners", "Popular Choice") are positioned at `top-4 left-4` which creates uneven spacing.

**Fix needed:** Adjust the badge positioning in lines 223-227 to create more balanced spacing. Change from `top-4 left-4` to `top-5 left-5` for consistent visual padding that matches the card's rounded corners and overall spacing.

## Expected Result
- Clean hero section without floating decorative icons
- Service card badges with balanced, professional spacing that aligns with the card design
