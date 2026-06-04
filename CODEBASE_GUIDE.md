# CODEBASE - Deportivo Lo Stanzino Website

## 🧠 Project Overview
This is a simple static website for a 5-a-side football (calcetto/palo sport) team made with friends.

The goal is to create a clean, modern, minimal but visually appealing website.

The site is a **single-page** experience: all sections (Hero, Team, Shop, Lo Stanzino) live in `index.html` and are reached via in-page anchor navigation.

---

## 🏗️ Tech Stack
- HTML5
- CSS3 (no frameworks for now)
- Vanilla JavaScript (only if needed)

No React, no backend, no complexity.

---

## 📄 Pages / Structure

`index.html` is the single-page site. Sections:

### Hero (`#hero`)
- Team image / gradient background
- Team name + tagline ("Born in the Stanzino")
- Call-to-action button

### Team (`#team`)
- Flip cards for each player (front: photo + role, back: bio + stats)

### Shop (`#shop`)
- Product cards for merch (lighters, t-shirt)
- Image, name, price

### Lo Stanzino (`#stanzino`)
- Origin story of the club + closing team photo

### Optional future sections
- Matches / results
- Contacts / social links

---

## 🎨 Style Guidelines
- Modern sporty aesthetic
- Clean layout
- Responsive design (mobile-first)
- Color palette defined as CSS variables in `style.css` (`--primary` purple, `--accent` gold, `--dark`)
- Smooth spacing and card design

---

## ⚙️ Development rules
- Keep everything simple and readable
- Avoid unnecessary libraries
- Prefer reusable CSS classes
- Keep components modular (sections)
- Keep all images in `images/` — do not duplicate asset folders

---

## 📌 Notes for AI assistant
When generating code:
- Always maintain consistency with existing structure
- Do not over-engineer
- Prefer simple solutions
- Ask before adding new pages or features
