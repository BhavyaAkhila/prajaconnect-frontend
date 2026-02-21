# FSAD-PS08: Citizen & Politician — Front-End

React front-end for improving interaction between citizens and politicians. Report issues, provide feedback, receive updates, and manage the platform by role.

## Roles & features

- **Citizen**: Report issues, give feedback, view updates from politicians
- **Politician**: Respond to concerns, post updates, engage in discussions
- **Moderator**: Monitor interactions, ensure respectful communication, resolve conflicts
- **Admin**: Oversee platform, manage user roles, ensure data integrity

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run preview   # preview production build
```

## Deploy (get your front-end link)

### Vercel (recommended)

1. Push this project to a Git repo (GitHub, GitLab, or Bitbucket).
2. Go to [vercel.com](https://vercel.com) and sign in.
3. **Import** your repository and deploy. Vercel will detect Vite and use the existing `vercel.json`.
4. Your deployed front-end link will be: `https://your-project-name.vercel.app`

### Netlify

1. Push to Git, then go to [netlify.com](https://netlify.com).
2. **Add new site** → Import from Git → select repo.
3. Build command: `npm run build`  
   Publish directory: `dist`
4. Deploy. Your link: `https://your-site-name.netlify.app`

---

**Deployed front-end link**: After you deploy using one of the options above, your live link will be the URL provided by Vercel or Netlify (e.g. `https://citizen-politician.vercel.app`).
