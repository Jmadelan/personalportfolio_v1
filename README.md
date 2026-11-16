# Jhon Mark N. Adelan — Personal Portfolio

A responsive, single-page student developer portfolio built with semantic HTML5, CSS3, and vanilla JavaScript.

## Project structure

```text
jhon-mark-portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   └── profile-placeholder.svg
├── assets/
│   └── cv-placeholder.pdf
└── README.md
```

## Run locally

1. Extract the project folder.
2. Open the folder in Visual Studio Code.
3. Open `index.html` in a browser, or use the VS Code Live Server extension.
4. Test the navigation, mobile menu, theme switcher, links, scroll effects, and contact form validation.

No build process or framework is required.

## Personalize the portfolio

- **Profile photo:** Replace `images/profile-placeholder.svg` with your own photo. Update the image `src` in `index.html` to `images/profile.jpg`.
- **CV:** Replace `assets/cv-placeholder.pdf` with your real CV and update the CV link if you add one to the page. Do not publish a placeholder as an actual résumé.
- **Skills:** Remove technologies you have not studied or used yet.
- **Projects:** Replace the starter project descriptions, repository links, status labels, and technology tags with accurate details. Add live demo links only when a working demo exists.
- **Education:** Update the year level as you progress.
- **Contact details:** Update the visible email address and GitHub URL if they change.

## Configure contact form email delivery (EmailJS)

GitHub Pages serves static files, so it cannot securely run a private mail server or protect server-side secrets. This project uses EmailJS as a client-side email delivery service. EmailJS's browser public key is designed to be visible, but never put a private key, SMTP password, or other secret in JavaScript.

1. Create an account at [EmailJS](https://www.emailjs.com/).
2. Add and connect an email service.
3. Create an email template. Suggested template variables:
   - `{{name}}`
   - `{{email}}`
   - `{{subject}}`
   - `{{message}}`
4. Set the template's reply-to field to `{{email}}`, and send the notification to your own inbox.
5. Copy your **Public Key**, **Service ID**, and **Template ID**.
6. Open `js/script.js` and replace the three `YOUR_EMAILJS_...` values in `EMAILJS_CONFIG`.
7. In the EmailJS dashboard, configure allowed origins/domains for your deployed site and enable any available abuse protection/rate limits.
8. Test with a message you can verify. Check the EmailJS dashboard and inbox.

If you do not configure EmailJS, the form validates fields and shows a clear message that the form is not connected; visitors can still use the visible `mailto:` email link.

## Test checklist

- [ ] Desktop layout at common laptop widths
- [ ] Mobile layout and hamburger menu
- [ ] Dark/light theme and persistence after refresh
- [ ] All navigation anchors
- [ ] GitHub and email links
- [ ] Contact form required fields and email validation
- [ ] EmailJS delivery after configuration
- [ ] Reduced-motion preference
- [ ] Replace placeholder profile and CV files
- [ ] Verify every project description and repository URL

## Deploy to GitHub Pages

1. Create a GitHub repository, for example `jhonmark-portfolio`.
2. Upload the contents of this folder to the repository root. Ensure `index.html` is at the root, not nested inside another folder.
3. Commit and push your changes.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the `main` branch and `/ (root)`, then save.
7. Wait for GitHub Pages to publish the site. Open the published URL and test it on desktop and mobile.
8. Add the published domain to EmailJS allowed origins if you configured the contact form.

## Notes

- The site uses Google Fonts and EmailJS's browser SDK from CDNs. An internet connection is needed for those external services.
- The site is static and GitHub Pages compatible.
- Do not add private API keys or passwords to this repository.
