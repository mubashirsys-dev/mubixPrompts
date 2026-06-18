# Mobile Responsiveness Implementation Plan

This document outlines the systematic plan to audit and make every page, modal, and interactive widget on MubixPrompts completely responsive and touch-friendly on mobile devices (320px to 768px).

---

## 1. Responsive Interface Audit & Key Gaps

### 🌐 A. Global Layout & Navigation (`src/components/layout/navbar.tsx`)
- **Current Setup**: Displays a mobile menu button (burger menu) below the `md` breakpoint, rendering a vertical navigation list.
- **Issues/Gaps**: 
  - Desktop-only CTA buttons sometimes peek through or wrap awkwardly on medium tablets.
  - Logo elements on small devices can touch the side margins.
- **Action**: Optimize padding, margin grids, and transitions for menu options on small screen viewports.

### 🤖 B. Floating AI Chat Widget (`src/components/shared/ai-chat-assistant.tsx`)
- **Current Setup**: Hardcoded to `w-[360px]` and positioned `right-6`.
- **Issues/Gaps**: On smaller screens (e.g., iPhone SE/12 mini, 320px–375px widths), the widget overflows the viewport horizontally and gets cut off.
- **Action**: Adapt container width to `w-[calc(100vw-32px)]` below `sm` breakpoint and adjust positioning anchors (`right-4`).

### ⚙️ C. Wizard Blueprint Builder (`src/app/builder/page.tsx` & Steps)
- **Current Setup**: Includes 27 wizard steps. Uses CSS grids.
- **Issues/Gaps**:
  - The bottom progress/action bar is fixed to the viewport (`fixed bottom-0`). On mobile, the grid wrapping makes buttons stack on top of each other, consuming too much vertical viewport estate.
  - Step contents (like the Category list, features selection, price toggles, custom drag-and-drop lists) need scaling checks to ensure no touch collisions.
- **Action**: 
  - Restructure the bottom sticky action bar layout using a tight flex row or wrap with responsive margins on mobile.
  - Adapt grid step layouts to stack cleanly.

### 🎨 D. Design Studio Workbench (`src/app/design-studio/page.tsx` & `ThemePreview`)
- **Current Setup**: Two-column layout on desktop: Left panel (14-style selector sidebar) and Right panel (Responsive live simulation workbench + explorer tabs).
- **Issues/Gaps**: 
  - Live simulator width calculations require safe clamping boundaries on extremely small viewports.
  - Navigation tab headers under the workbench can cause horizontal page scrolling on mobile screens.
- **Action**: Ensure overflow wrapping on token tabs and verify that scale values inside `ThemePreview` dynamically adjust.

---

## 2. Implementation Checklist

### Step 1: Global & Shared Widgets
- [x] **Navbar Layout**: Add safe margins and verify responsive behavior.
- [x] **AI Assistant Widget**: Modify container sizing class from `w-[360px]` to `w-[calc(100vw-32px)] sm:w-[440px]` and `right-4 sm:right-6`.

### Step 2: Builder Dashboard & Steps
- [x] **Sticky Action Bar**: Re-design the sticky bottom bar on `src/app/builder/page.tsx` to remain compact on screens under `640px`.
- [x] **Step Forms**: Check alignment of inputs, select dropdowns, and button containers inside steps.

### Step 3: Design Studio & Theme Simulator
- [x] **Theme Tabs Header**: Enable smooth horizontal scrolling or wraps on tabs.
- [x] **Simulated Sandbox Canvas**: Adjust canvas scale variables for seamless fits on compact mobile devices.

---

## 3. Testing Matrix
- **Simulated Devices**: iPhone SE (375px), iPhone 12/13/14 Pro (390px), Pixel 7 (412px), iPad Mini (768px).
- **Checks**:
  - Zero horizontal scrollbars on the main document body.
  - Easy-to-tap button components (minimum 44x44px target area).
  - High contrast readability and robust flow alignments.
