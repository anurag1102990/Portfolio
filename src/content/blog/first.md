---
title: "ML Theory is Everywhere. Practice is Nowhere. So I Built It."
date: 2026-03-02
category: "Building"
excerpt: "I had Grade A's in every ML course. But sitting in interviews with messy datasets, I realized I'd been trained to understand ML, not to use it. So I built CodeNeuron."
featured: true
readTime: "6 min read"
draft: false
---

Current ML education has a huge invisible hole. You can ace every exam, understand backpropagation, implement gradient descent from scratch, and still freeze the moment someone puts a real, messy dataset in front of you and asks **“so, what would you do here? ”**

That was me. Grade A’s in RL, Computer Vision, supervised, unsupervised, and deep reinforcement learning course. But sitting in job interviews, being handed a dataset with missing values, noisy features, and no clear answer, I realized something uncomfortable. I had been **trained to understand ML, not to use it**. So I built [CodeNeuron](https://codeneuron.tech/). Solo. As a final year Computer Science student, between classes, research, and a TA job.

## The difference is bigger than it sounds

Understanding ML means you can explain why gradient descent works. Using ML means you can look at a model that’s not converging and actually diagnose whether it’s your learning rate, your data, or your architecture. Universities are excellent at the first part. The **second one is rarely on the syllabus.**

And that’s not just a student problem. It’s an interview problem. Interviewers don’t ask multiple choice questions about techniques. They watch and assess you on the way you think and tackle a certain problem in a certain environment with certain constraints with proper justification of your answers. Re-reading theory won’t prepare you for that. Solving real problems will.

<video src="/images/blog/Demo.mp4" controls playsinline muted></video>

The real challenge in industry is not “How do I implement a decision tree from scratch?” It’s “Why would a decision tree work here, and how do I use it to actually solve this?” CodeNeuron is built around that question. The skill of applying techniques, evaluating model output, and knowing when to override it is what will matter in the years ahead. That’s the idea the platform underlines and amplifies.

## People are using it

Without a single ad or promotion campaign, CodeNeuron has picked up 40+ registered users across 7 countries: US, Canada, India, Germany, France, Malaysia, and Australia. 449 total visits, 60 sessions in the last 30 days alone, and real code submissions from real users solving real problems. All organic. All word-of-mouth. No ads, no launch post, no marketing budget. Just students finding it, finding it useful, and sharing it with others who felt the same gap. That was the first signal that this wasn’t just a side project solving my own problem. Other people had the same gap.

<img src = "/images/blog/Users.png" alt = "Users origin" />

But numbers only tell half the story. What actually validated the idea was hearing how people used it. One early user put it simply:

> I only read theory but this is very helpful, like LeetCode for AI/ML.

Another said the biggest advantage was never having to hunt for interesting datasets:

> There’s already data and a topic ready to go.

Others pointed to the experience after hitting submit:

> Nice visuals after submitting tests. Pretty clean UI and topic explanations.

Different users, different things they valued. But the thread running through all of it was the same: they wanted to practice, not just study. And they didn’t have a good way to do that before.

<img src="/images/blog/visualization.png" alt="CodeNeuron output — automated evaluation with visualizations, RMSE metrics, and residual plots" />

But building a platform where real users run their own code comes with a problem nobody warned me about. Any user can submit anything. A malicious script, an infinite loop, a command that wipes the filesystem. Evaluating user-submitted code means that code travels through the entire platform architecture, and one bad script could take everything down in seconds. User data, platform code, everything.

## So before writing a single line of the evaluation system, I had to answer one question: How do you run untrusted code without trusting it?

There are several ways to approach this. MicroVM sandboxes like Firecracker, Kata, or Cloud Hypervisor offer strong isolation. Serverless options like AWS Lambda or Cloud Run Jobs let you spin up fresh environments per run. Each has tradeoffs in cost, complexity, and control.

For the scale CodeNeuron was at, Docker was the right call. Best security per dollar, full control over the environment, and straightforward to integrate with the existing architecture.

Each time a user submits code, a small independent Docker container spins up holding only three things: the user code, the evaluation file, and the dataset. Nothing else has access. The site gets the signal that code is waiting, verifies the user, nods at Docker to safely run the evaluation, catches the results, kills the container and returns results back. The rest of the platform never sees the submitted code. Clean, isolated, and secure.

<img src="/images/blog/Docker.png" alt="Secure Code Evaluation Cycle — how CodeNeuron isolates and runs user-submitted code"/>

Getting there was not straightforward. Making Docker compatible with the existing platform architecture meant rethinking the entire evaluation flow. The hardest part was the communication layer between the site and Docker, making sure both sides always exchanged exactly the right data to complete the task. It took a lot of debugging. But getting it right is what makes CodeNeuron production-grade, and **not just another side project.**

Under the hood, the platform runs on a stack built for speed, isolation, and low overhead. The frontend is React with Vite and Tailwind — fast to develop, fast to load. The backend is FastAPI with Python handling the REST API and all core ML logic. Infrastructure sits on Firebase for authentication and database, Docker for containerized code execution, and Google Cloud Run for serverless deployment. Every piece was chosen for a reason: keep it lean, keep it secure, and keep it cheap enough that a solo developer can actually run it in the early phases.

<img src = "/images/blog/Architecture.png">

## What’s Next

CodeNeuron is still early, and there is a lot more coming.

For instance, a neural network playground is almost ready, where users can visualize why each layer exists and watch how it transforms data to complete tasks like image detection. And AI integration is on the roadmap, not just hints and code comments, but personalized learning roadmaps and follow-up questions after each problem to mimic a real interview environment and push users to think deeper.

The goal has always been the same. Close the gap between knowing ML and using it.

What’s the one thing that would’ve made ML actually click for you, not just in theory, but in real-world application?

---

**What's the one thing that would've made ML actually click for you — not just in theory, but in real-world application?**
&nbsp;

[**Try CodeNeuron →**](https://codeneuron.tech/)

[**Medium Post →**](https://medium.com/@anurag.jain486/ml-theory-is-everywhere-practice-is-nowhere-so-i-built-it-51414cd9bdee)
