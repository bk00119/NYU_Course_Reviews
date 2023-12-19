# NYU Course Reviews (Full-stack)

### [Web: Beta](https://nyu-course-reviews-bk00119.vercel.app/)

### [GitHub Repo](https://github.com/bk00119/NYU_Course_Reviews)

### [Figma Wireframe](https://www.figma.com/file/fFhlKNgfpxM6pp3CmJSFZb/NYU-Course-Reviews?type=design&node-id=0-1&mode=design&t=Tt5kchVVFl4yakqH-0)

# Overview of the Project
## View course prereqs and basic info
- Instruction mode
- Past course days, times
- Credit units

## Course ratings/comments
- By each section/semester
- Form: course, section, ratings, comments, grade (optional)

## Pages
- Home
- School (Tandon, CAS, etc): show a list of subjects
- Subject: show a list of courses
- Course

## Tools/Language
- MongoDB Atlas for cloud DB
- Frameworks: Next.js (SSR & some Client Components)
- Tailwind CSS
- Node.js for backend
- Hosted on Vercel

# Development
## Pages
- `/`: List of schools at NYU
- `/[school]/`: List of subjects at the school
- `/[school]/[subject]/`: List of coures of the subject
- `/[school]/[subject]/[course]/`: Info of the course and a list of sections of it
- `/[school]/[subject]/[course]/[section]/`: Info of the section and a list of reviews
- `/review/course_section`: Form for writing a review of the course section
- `/api/*`: API routes


## Directories
- **`page.js` are for page and `route.js` are for API routes**
- `src/app/*`: Pages that clients can see (ex. src/app/api/school/schools is http://localhost:3000/api/school/schools)
- `src/app/[page]`: Page like this takes a value for its parameter
- `src/app/components/*`: Reusable components are located here
- `src/lib/*`: Mostly server side functions are located here such as a function for fetching data from MongoDB (CLIENTS DON'T HAVE ACCESS)
- `src/lib/store/*`: Redux store
- `src/lib/db/*`: DB Functions

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
