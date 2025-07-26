# 🧩 Product Requirements Document (PRD)

## 🔧 Project: Trac Modernization – Feature Enhancement Suite  
This PRD outlines the 6 new features being added to enhance the legacy Trac platform while maintaining its core functionality and improving the UI/UX for modern users. All features are scoped for feasibility and non-disruption of existing workflows.

---

## 📁 1. Drag-and-Drop File Upload for Tickets

### 📝 Purpose
Let users attach screenshots, logs, or supporting files when creating tickets. Improves bug reporting and clarity.

### 📍 Location
- Page: `New Ticket`
- Placement: Below the **Description** field, above the **create ticket** button

### 💡 UX Behavior
- Shows dashed dropzone: "Drag files here or click to upload"
- Supports drag-and-drop and click-to-upload
- Shows file chips with `×` delete icons
- Up to 5 files, max 5MB each

### ⚙️ Functionality
- Accepts: `.png`, `.jpg`, `.jpeg`, `.pdf`, `.txt`, `.log`, `.zip`
- Files stored in Firebase Storage (or local server)
- File URLs attached to ticket data on submit
- If backend not connected, show fake confirmation toast and list of filenames

### 🎨 Styling
- Border and text match dark-tech theme
- Hover glow
- Accessible (keyboard + ARIA)

---

## 📊 2. Analytics Dashboard for Admins

### 📝 Purpose
Provides an overview of project health via charts and summaries of tickets, milestones, contributors, and activity trends.

### 📍 Location
- Page: `/analytics` (new page)
- Linked in top nav only visible to admins

### 💡 UX Behavior
- Dashboard cards: Total Tickets, Open Bugs, Milestone Progress, etc.
- Charts: Bar, line, and pie charts via Chart.js or Recharts
- Filter by time (Last 7 days, Month, All time)

### ⚙️ Functionality
- Reads data from tickets and milestones
- If real backend is missing, show mock JSON data
- Works responsively

### 🎨 Styling
- Dark glassmorphic cards
- Bright accents (teal, cyan, yellow highlights)
- Toggle between light/dark chart themes

---

## 🤖 3. AI Ticket Assistant (LLM Integration)

### 📝 Purpose
Helps users write better ticket descriptions using an LLM (e.g., OpenAI). Reduces vague tickets and improves developer context.

### 📍 Location
- Page: `New Ticket`
- Placement: Beside or under Description box
- Button: "Auto-Suggest Description"

### 💡 UX Behavior
- User types short problem
- Clicks "Auto-Suggest" — assistant returns a more complete ticket text
- Option to "Use suggestion" or "Regenerate"

### ⚙️ Functionality
- Uses OpenAI API (via Firebase Cloud Function if needed)
- Prompts include project + title context
- Optional: Pull recent similar tickets to suggest duplicates

### 🎨 Styling
- Modal or expandable panel
- Bot avatar + animated typewriter effect
- Use accent glow based on theme (e.g., electric blue)

---

## 📥 4. Notification Center / Alerts Widget

### 📝 Purpose
Notifies users of ticket assignments, comments, milestone deadlines. Keeps users in the loop.

### 📍 Location
- Fixed bell icon in top-right of navbar

### 💡 UX Behavior
- Bell opens dropdown
- Shows list of recent alerts (e.g., "You were assigned Ticket #42")
- Unread indicators, optional sound or toast

### ⚙️ Functionality
- Uses Firebase Realtime DB or Firestore listeners (or local dummy for now)
- Each alert includes:
  - Title
  - Description
  - Timestamp
  - Link to relevant page

### 🎨 Styling
- Slide-in glass panel
- Unread count badge
- Dark-themed scrollable feed

---

## 🔎 5. Smart Search Bar with Filters

### 📝 Purpose
Helps users search across tickets, wiki pages, and milestones with intelligent filtering.

### 📍 Location
- Replaces or upgrades existing search box in navbar (top-right)

### 💡 UX Behavior
- Supports keyword + filter tokens (e.g., `type:bug`, `status:open`)
- Autocomplete on common queries
- Displays result preview in dropdown

### ⚙️ Functionality
- Client-side search of mock ticket data (can connect to Firestore later)
- Optional fuzzy search matching
- Supports filters: type, date, status

### 🎨 Styling
- Minimalist input field
- Rounded container with glowing border
- Icon hints for filters (bug, task, etc.)

---

## 🧱 6. Kanban View for Ticket Progress

### 📝 Purpose
Visualizes ticket statuses in columns ("To Do", "In Progress", "Done"). Great for agile workflows.

### 📍 Location
- Page: `/board`
- Button to access from top navbar

### 💡 UX Behavior
- Tickets appear as draggable cards
- Columns for each status
- Drag to update status (updates backend or local mock)

### ⚙️ Functionality
- Uses HTML drag-and-drop or a library like `react-beautiful-dnd`
- Syncs with ticket status
- Uses mock data for now with unique ticket IDs

### 🎨 Styling
- Board-style background
- Colored columns with icon headers
- Smooth drag transitions

---

## ✅ Final Notes
- All features respect current theme (dark tech)
- All mock-data-based features should degrade gracefully without breaking anything
- Features are modular and isolated to specific pages/components
- Each feature will be implemented one at a time, starting with the Drag-and-Drop Upload feature

--- 