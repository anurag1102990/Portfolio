---
title: "ML Theory is Everywhere. Practice is Nowhere. So I Built It."
date: 2026-03-02
category: "Building"
excerpt: "I had Grade A's in every ML course. But sitting in interviews with messy datasets, I realized I'd been trained to understand ML, not to use it. So I built CodeNeuron."
featured: true
readTime: "5 min read"
draft: true
---

Current ML education has a huge invisible hole. You can ace every exam, understand backpropagation, implement gradient descent from scratch, and still freeze the moment someone puts a real, messy dataset in front of you and asks _"so, what would you do here?"_

That was me. Grade A's in RL, Computer Vision, supervised, unsupervised, and deep reinforcement learning. But sitting in job interviews, being handed a dataset with missing values, noisy features, and no clear answer, I realized something uncomfortable.

**I had been trained to understand ML. Not to use it.**

So I built [CodeNeuron](https://codeneuron.tech/). Solo. As a final year Computer Science student, between classes, research, and a TA job.

---

## The difference is bigger than it sounds

Understanding ML means you can explain why gradient descent works. Using ML means you can look at a model that's not converging and actually diagnose whether it's your learning rate, your data, or your architecture.

Universities are excellent at the first part. The second one is rarely on the syllabus.

And that's not just a student problem. It's an interview problem. Interviewers don't ask multiple choice questions about techniques. They watch how you think, how you approach an unfamiliar problem, and how you justify your decisions under constraints.

Re-reading theory won't prepare you for that. Solving real problems will.

**That's the gap CodeNeuron was built to fill.**

---

## Make ML intuitive, not abstract

Instead of abstract puzzles or hour-long courses in a Jupyter notebook, CodeNeuron brings you straight into industry-representative scenarios. A digital media agency wants to predict ad revenue. A logistics company needs to optimize delivery routes. A healthcare provider wants to flag anomalies in patient data.

These are the kinds of problems ML engineers actually face, and they come with real, messy datasets — missing rows, noisy features, and no clean answers handed to you.

No setup. No downloading datasets. No boilerplate. **Just you vs. the problem, nothing else.**

The real challenge in industry is never _"How do I implement a decision tree from scratch?"_ It's _"Why would a decision tree work here, and how do I use it to actually solve this?"_

CodeNeuron is built around that question. The skill of applying techniques, evaluating model output, and knowing when to override it is what will matter in the years ahead. That's the idea the platform underlines and amplifies.

<img src="/images/blog/Solve_problem.png" alt="CodeNeuron problem view — Forecasting Online Ad Revenue with a live code editor and dataset preview" style="display:block; width:100%; max-width:700px; max-height:480px; object-fit:contain; margin:2.5rem auto; border-radius:8px;" />

---

## People are using it

Without a single ad or promotion campaign, CodeNeuron has picked up **40+ registered users across 7 countries** — US, Canada, India, Germany, France, Malaysia, and Australia. 449 total visits, 60 sessions in the last 30 days alone, and real code submissions from real users solving real problems.

All organic. All word-of-mouth. No ads, no launch post, no marketing budget. Just students finding it, finding it useful, and sharing it with others who felt the same gap.

That was the first signal that this wasn't just a side project solving my own problem. Other people had the same gap.

But numbers only tell half the story. What actually validated the idea was hearing how people used it.

"I only read theory but this is very helpful, like LeetCode for AI/ML."

"The biggest advantage was never having to hunt for interesting datasets — there's already data and a topic ready to go."

"Nice visuals after submitting tests. Pretty clean UI and topic explanations."

Different users, different things they valued. But the thread running through all of it was the same: they wanted to practice, not just study. And they didn't have a good way to do that before.

---

## Running untrusted code without trusting it

Building a platform where real users run their own code comes with a problem nobody warned me about.

Any user can submit anything. A malicious script, an infinite loop, a command that wipes the filesystem. Evaluating user-submitted code means that code travels through the entire platform architecture, and one bad script could take everything down in seconds. User data, platform code, everything.

So before writing a single line of the evaluation system, I had to answer one question: **how do you run untrusted code without trusting it?**

There are several ways to approach this. MicroVM sandboxes like Firecracker, Kata, or Cloud Hypervisor offer strong isolation. Serverless options like AWS Lambda or Cloud Run Jobs let you spin up fresh environments per run. Each has tradeoffs in cost, complexity, and control.

For the scale CodeNeuron was at, **Docker was the right call.** Best security per dollar, full control over the environment, and straightforward to integrate with the existing architecture.

Each time a user submits code, a small independent Docker container spins up holding only three things: the user code, the evaluation file, and the dataset. Nothing else has access. The site gets the signal that code is waiting, verifies the user, nods at Docker to safely run the evaluation, catches the results, kills the container, and returns everything back. The rest of the platform never sees the submitted code.

**Clean, isolated, and secure.**

<img src="/images/blog/Docker.png" alt="Secure Code Evaluation Cycle — how CodeNeuron isolates and runs user-submitted code" style="display:block; width:100%; max-width:600px; max-height:600px; object-fit:contain; margin:2.5rem auto; border-radius:8px;" />

Getting there was not straightforward. Making Docker compatible with the existing platform architecture meant rethinking the entire evaluation flow. The hardest part was the communication layer between the site and Docker, making sure both sides always exchanged exactly the right data to complete the task. It took a lot of debugging. But getting it right is what makes CodeNeuron production-grade, and not just another side project.

---

## Under the hood

The platform runs on a stack built for speed, isolation, and low overhead. The frontend is React with Vite and Tailwind — fast to develop, fast to load. The backend is FastAPI with Python handling the REST API and all core ML logic. Firebase handles authentication and the database, Docker handles containerized code execution, and Google Cloud Run handles serverless deployment.

Every piece was chosen deliberately: keep it lean, keep it secure, and keep it cheap enough that a solo developer can actually run it in the early phases.

<img src="/images/blog/visualization.png" alt="CodeNeuron output — automated evaluation with visualizations, RMSE metrics, and residual plots" style="display:block; width:100%; max-width:700px; max-height:700px; object-fit:contain; margin:2.5rem auto; border-radius:8px;" />

---

## See it in action

<video src="/images/blog/Demo.mp4" controls playsinline muted style="display:block; width:100%; max-width:700px; max-height:480px; margin:2.5rem auto; border-radius:8px;"></video>

---

## What's next

CodeNeuron is still early, and there is a lot more coming.

A **neural network playground** is almost ready — users will be able to visualize why each layer exists and watch how it transforms data to complete tasks like image detection in real time.

**AI integration** is also on the roadmap. Not just hints and code comments, but personalized learning roadmaps and follow-up questions after each problem to mimic a real interview environment and push users to think from different angles.

The goal has always been the same. **Close the gap between knowing ML and using it.**

---

_What's the one thing that would've made ML actually click for you — not just in theory, but in real-world application?_

&nbsp;

[**Try CodeNeuron →**](https://codeneuron.tech/)
