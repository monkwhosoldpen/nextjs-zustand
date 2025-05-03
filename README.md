# Dashboard Sidebar Project

### Duration and Timeline
- **Duration:** 2-3 days to complete from date sent
- **Timeline:** 2-3 hours if you go over explain why

### Instructions
1. Create a Stackblitz/CodeSandbox and do not modify requirements noted at the first PR's take home exercise.
2. Use this as a platform to develop the feature described as efficiently as possible.
3. Record a 3-5 minute Loom sharing your context and design thinking and walking through your work. Do not exceed 5 minutes.
4. Be prepared to discuss live in our next call.

### Deliverables
- Stackblitz/CodeSandbox link
- Loom Link

### Notes
- We intentionally gave directional details and high-level requirements to simulate real-world situations.
- If you have any questions, document them but keep yourself unblocked.
- We're not looking for pixel perfection but you should be very close to the wireframes.
- If you run into challenges or tradeoffs, be sure to speak through them.
- If you add improvements, be sure to document them.
- Don't use GPT for scaffolding, it will remove half from the qualification.
- Joe don't need saving internally if need, don't use UI libraries, no styling libraries.

## Requirements Gathering

### As a user
- I need an alert when something important happens and also explain why
- I can add to my layouts

### As a user
- I need help deciding what KPIs to track
- I need to add my own KPIs to my pages and see if I can build my layout

### As a user
- I want to do a deep dive into my kpi data
- I need select visuals that best communicates insights
- So I can quickly capture and annotate insights

### As a user
- I don't have access to something
- I request access and also explain reason why
- I can add to my layouts

## Implementation
This project implements an interactive analytics dashboard with a multi-tab sidebar navigation system using Next.js. The sidebar can be collapsed or expanded, providing navigation between different dashboard sections (Featured, KPIs, Layouts, Storyboards).

### Features
- Collapsible sidebar with toggle functionality
- Navigation between dashboard sections
- Responsive design with mobile adaptations
- Management of different asset types: KPIs, Layouts, DataViz, and Storyboards
- Support for favorites and access permissions
- Asset details and expanded views
- Search functionality

### Technology Stack
- Next.js
- TypeScript
- Tailwind CSS
- Zustand for state management

## Technical Requirements

### User Flow Structure
![User Flow Structure](https://github.com/username/dashboard-sidebar/raw/main/public/user-flow.png)

The application follows a structured user flow as shown in the diagram above:

1. **Library Section**
   - Search/filter functionality
   - Asset exploration
   - Scrolling through assets
   - Show more details option
   - Request access capability

2. **Filtered View**
   - Recent searches history
   - Clear search option
   - Asset exploration

3. **Asset Modal (Base)**
   - Description display
   - Favorite toggling
   - Copy link functionality
   - Expanded asset section with additional assets

4. **KPI Modal**
   - Business Questions
   - Metric IDs
   - Description
   - Calculation
   - Visuals available
   - Affiliate Applicability

5. **Data Viz Modal**
   - Applicable KPI favorites
   - Asset info context
   - Interactive chart capabilities

6. **Layout Modal**
   - Amount of pages
   - KPIs being used
   - Preview layout option

7. **Storyboard Modal**
   - Coupled KPIs/filters
   - Applicable affiliates
   - Request access functionality

### Implementation Requirements
- No external UI libraries allowed
- No styling libraries allowed
- Custom components must be built from scratch
- Mobile responsiveness required
- State management using Zustand
- Clean, modular code structure
- Type safety with TypeScript
