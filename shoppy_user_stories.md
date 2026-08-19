# Shoppy
## AI-Powered Physical Shop Discovery Platform
Colombo, Sri Lanka

Product Requirements — User Stories (MVP)
Prepared by: Business Analysis

## Platform Overview

### Problem Statement
In Sri Lanka, there is no single digital platform that consolidates shops across key Colombo locations. When someone wants to buy something, they must physically travel to a location and move from shop to shop, spending significant time and effort due to the ambiguity of not knowing which shop to enter, what products each carries, or where exactly the shop is located inside a complex multi-level mall or dense open-air market.

Existing tools like Google Maps and Google Search fail to solve this because they cannot accurately represent indoor environments — individual shops inside a multi-level mall such as One Galle Face or Colombo City Center are largely invisible, and the dense lane-by-lane structure of open-air markets like Pettah is entirely unmapped at the shop level.

### What Shoppy Does
Shoppy is an AI-powered platform that redefines the physical shopping experience in Colombo. It creates a single, consolidated digital directory of verified physical shops across key locations — malls and open-air markets alike — and wraps it in a conversational AI interface so that users can describe what they need in plain language and instantly receive matched shop recommendations, including precise location details (floor, unit, or street) to guide their physical visit.

The platform is intentionally minimalistic: the goal is not to replicate e-commerce but to act as a smart pre-visit navigator that saves shoppers time, removes ambiguity, and helps them walk into the right shop on the first try.

### Supported Locations (MVP)
• One Galle Face Mall
• Colombo City Center
• Marino Mall
• Havelock City Mall
• Pettah Market

### How a User Uses Shoppy
A shopper visits Shoppy, logs in, and is presented with a clean conversational interface. They select a location from the prompt bar — or choose All Locations — and type a natural language request such as "I want to buy a birthday gift under Rs. 5,000" or "Where can I find the best saree shops in Pettah?" Shoppy's AI processes the request, matches it against a verified database of shops and products, and returns a set of ranked shop cards with the shop name, a brief description, location details (floor or street), and points earned.

The shopper clicks into any shop card to view its full page — including all products listed as a grid with images, prices, and descriptions — giving them enough information to decide before they even leave home. When they are ready, they visit the physical shop with confidence, knowing exactly where to go and what to expect.

For those who prefer to browse without a specific need, a separate Shop Catalog section allows direct search and filtering by location. A Seasonal Trip Planner in the profile section also surfaces relevant shops ahead of key occasions like Christmas and New Year.

## Role: Shopper

### Epic: Authentication
**US-01:** As a shopper, I want to see a landing page before logging in, so that I understand what Shoppy offers.
**US-02:** As a shopper, I want to sign up/login via email or OAuth, so that I can access the platform easily.
**AC:** "Sign in" option visible at bottom of sidebar too.

### Epic: Chat Interface
**US-03:** As a shopper, I want a simple ChatGPT-like landing chat screen with a greeting and quick-try prompts (e.g. "Gifts under Rs. 5K", "Electronics"), so that I can start searching quickly without typing.
**AC:** Interface follows a clean, minimal layout as per reference design (centered greeting, prompt bar at bottom, simple sidebar).
**US-04:** As a shopper, I want a "New Chat" button and a sidebar with chat history, so that I can revisit past searches.
**US-05:** As a shopper, I want to select a location from the prompt bar (One Galle Face, Colombo City Center, Marino Mall, Havelock City, Pettah Market, All Locations), so that I can scope my search to a specific place.
**US-06:** As a shopper, I want to see a "Prompt Guide" link, so that I can learn how to phrase effective search queries.

### Epic: Search Prompts
**US-07:** As a shopper, I want to ask for products within a price range, so that I find items within budget.
**US-08:** As a shopper, I want to search by brand and price range.
**US-09:** As a shopper, I want gift suggestions for occasions (birthday, Christmas, New Year).
**US-10:** As a shopper, I want to search by shop category (kitchen, electronics, jewelry, etc.).

### Epic: Gamification
**US-11:** As a shopper, I want to see my earned points and tier badge (e.g. "50 points – Bronze") in the profile section, so that I feel rewarded for using the platform.
**US-12:** As a shopper, I want to see a "Seasonal Trip Planner" widget (e.g. Christmas planning, New Year) in the user profile section.

### Epic: User Profile & Settings
**US-13:** As a shopper, I want to click my profile (bottom-left corner) to open a profile/settings section, so that I can manage my account in one place.
**AC:** Clicking the bottom-left profile area opens the profile/settings section.
**AC:** Section includes: theme toggle, update profile info, upload/change profile photo, and view points earned.
**US-14:** As a shopper, I want a feedback sub-section inside my profile where I can select a shop from a searchable dropdown and submit feedback, so that I can leave feedback for any shop from one place.
**AC:** Dropdown shows matching shop names as the user types.
**AC:** User selects a shop and submits feedback text (and rating, if applicable).

### Epic: Search Results & Shop Discovery
**US-15:** As a shopper, I want to see the top-k shops generated relevant to my prompt within the scope of the selected location (name, description, points earned, location, which floor of the mall/which street in Pettah), so that I can compare options and easily locate the shop.
**US-16:** As a shopper, I want to click a shop card to open its full shop page.
**US-17:** As a shopper, I want a separate "Shop Catalog" section with a search bar and a location filter, so that I can browse all shops directly without going through the chat.
**AC:** Search bar allows typing a shop name/keyword.
**AC:** Filter dropdown lets user select a specific location (One Galle Face, Colombo City Center, Marino Mall, Havelock City, Pettah Market, All Locations).
**AC:** Shop results update based on search + filter selection.

### Epic: Shop Page
**US-18:** As a shopper, I want to see a shop's hero section (name, description, image, location, contact no, points the shop has earned), so that I get a full overview of the shop at a glance.
**US-19:** As a shopper, I want a search bar inside the shop page to search by product name or category, so that I can quickly find relevant products without scrolling through everything.
**AC:** Search returns relevant products matching the typed keyword.
**AC:** Results update as the user types or on submit.
**US-20:** As a shopper, I want to browse all products as a grid of cards (image, name, price).
**US-21:** As a shopper, I want to click a product card to see a pop-up with full description, status, and image.
**US-22:** As a shopper, I want to see an AI-generated summary of all feedback on a shop page, so that I can quickly understand the overall customer experience without reading every review.
**AC:** Summary is auto-generated from all submitted feedback for that shop.
**AC:** Summary updates as new feedback is submitted.
**AC:** Shown as a short paragraph (2-3 sentences) in the feedback section of the shop page.

### Epic: Vendor Onboarding (initiated by Shopper)
**US-V1:** As a shopper, I want an "Add Your Shop" option in my profile, so that I can apply to list my shop.
**US-V2:** As a vendor applicant, I want to submit shop details (name, location, BR number, description, contact, photo), so that the platform can verify my business.

## Role: Admin

### Epic: Admin Dashboard (separate interface)
**US-A1:** As an admin, I want to log in to a separate Admin Dashboard, so that I can manage the platform.
**US-A2:** As an admin, I want to view all pending vendor applications with submitted details, so that I can review them.
**US-A3:** As an admin, I want to approve or reject a vendor application, so that only legitimate shops are listed.
**AC:** On approval, vendor role + Vendor Dashboard access is unlocked automatically.
**US-A4:** As an admin, I want to view a list of all shoppers and vendors, so that I can monitor platform activity.
**AC:** Basic list view only (name, email, role, status) — no bulk actions needed for MVP.

## Role: Vendor

### Epic: Vendor Dashboard (separate interface)
**US-D1:** As an approved vendor, I want to log in to my Vendor Dashboard, so that I can manage my shop.
**US-D2:** As a vendor, I want to view/edit my shop details (name, description, location, contact, image), so that my info stays accurate.
**US-D3:** As a vendor, I want to add, edit, or remove products (name, price, image, description, status), so that shoppers see up-to-date offerings.
**US-D4:** As a vendor, I want to view feedback submitted about my shop, so that I can understand customer experience.
**US-D5:** As a vendor, I want to see a Shop Health Score (percentage) in my dashboard, so that I know how complete and up-to-date my shop profile is.
**AC:** Score reflects completeness of shop image, description, contact, floor/street, and minimum product count.
**AC:** Score reflects recency — drops if shop/products have not been updated within a defined period.
**AC:** Dashboard shows which specific items are incomplete to guide the vendor.

## User Journeys

### 1. Shopper Journey
1. Lands on the Shoppy landing page and clicks Sign Up / Login (top-right).
2. Authenticates via email or OAuth.
3. Redirected to the chat home screen — sees greeting and quick-try prompts.
4. Selects a location (e.g. "Pettah Market") from the prompt bar and types a request, e.g. "I want a birthday gift under Rs. 5,000."
5. Receives top-k matching shop cards (name, description, points, floor/street).
6. Clicks a shop card → views the shop page (hero section, AI feedback summary, products grid).
7. Uses the in-page product search or browses the grid, clicks a product → views full details in a pop-up.
8. Visits the shop physically using the location/floor/street info shown.
9. Later, opens profile → selects the shop from the searchable dropdown → submits feedback.
10. Checks points/tier badge and Seasonal Trip Planner in the profile section.
11. (Optional) Clicks "Add Your Shop" in profile to apply as a vendor, submitting shop + BR number details.

### 2. Admin Journey
1. Logs in to the separate Admin Dashboard.
2. Views the list of pending vendor applications.
3. Opens an application, reviews shop name, location, BR number, description, contact, and photo.
4. Approves (unlocks vendor role + Vendor Dashboard access) or rejects the application.
5. Views the combined shopper/vendor list to monitor overall platform activity.

### 3. Vendor Journey
1. Receives approval and logs in to the Vendor Dashboard.
2. Reviews and edits shop details (name, description, location, contact, image) submitted during onboarding.
3. Adds products with name, price, image, description, and status.
4. Monitors the Shop Health Score and completes any flagged incomplete fields to reach 100%.
5. Shop and products become visible to shoppers in AI search results and the Shop Catalog.
6. Periodically checks the Vendor Dashboard for shopper feedback and updates product status/stock as needed.

## 10 Sample User Prompts
The following illustrate how shoppers will interact with Shoppy across different needs — retail, gifting, category browsing, and food court discovery.

1. Budget product search — "I want to buy a handbag under Rs. 3,500 in Pettah Market."
2. Brand + price range — "Show me Nike or Adidas sneakers between Rs. 8,000 and Rs. 15,000 at One Galle Face."
3. Occasion gifting — "I need a birthday gift for my girlfriend under Rs. 5,000 — she likes jewellery and accessories."
4. Seasonal gifting — "What are the best shops to buy Christmas gifts for a family of four at Colombo City Center?"
5. Shop category discovery — "Where can I find the best kitchen appliance shops across all locations?"
6. Open-air market navigation — "I'm looking for fabric and saree shops in Pettah — which street should I go to?"
7. Food court — quick meal — "I want to grab a quick rice and curry meal at the food court in Marino Mall."
8. Food court — occasion — "Any good dessert or cake shops inside One Galle Face for a small birthday celebration?"
9. Electronics + location scoped — "Find me the best mobile accessory shops at Havelock City Mall."
10. Multi-need trip planning — "I'm visiting Pettah this weekend — I need school supplies, some stationery, and a quick bite. What shops should I visit?"
