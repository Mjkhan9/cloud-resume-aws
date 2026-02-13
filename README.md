# ☁️ Cloud Resume — AWS Production Deployment

A fully operational static resume website deployed on AWS using production-grade cloud architecture. This project showcases end-to-end infrastructure provisioning — from S3 origin hosting and CloudFront CDN delivery to Route 53 DNS resolution, ACM-managed TLS encryption, and least-privilege IAM controls.

**🔗 Live Site:** [https://usmanaws.com](https://usmanaws.com)

---

## Architecture

```
Client Request
      │
      ▼
  Route 53 (DNS)
      │  A Record (Alias)
      ▼
  CloudFront (CDN)
      │  HTTPS termination · Edge caching · HTTP → HTTPS redirect
      ▼
  S3 Bucket (Origin)
      │  Static website hosting · OAC-restricted access
      ▼
  Response delivered to client
```

---

## Technology Stack

| Layer | Service | Purpose |
|-------|---------|---------|
| **Frontend** | HTML, CSS, JavaScript | Responsive single-page resume with interactive timeline |
| **Hosting** | Amazon S3 | Static website hosting with versioning |
| **CDN** | Amazon CloudFront | Global edge caching, HTTPS enforcement, Origin Access Control |
| **DNS** | Amazon Route 53 | Domain registration, hosted zone, alias A-record routing |
| **TLS/SSL** | AWS Certificate Manager (ACM) | Public certificate provisioning and DNS validation |
| **Security** | AWS IAM | Least-privilege user policies, scoped service permissions |

---

## Implementation Walkthrough

### 1 · Frontend Development

- Designed and built a responsive single-page resume using semantic HTML, custom CSS, and vanilla JavaScript.
- Implemented an interactive employment timeline with click-to-expand role details and staggered bullet animations.
- Structured the codebase into modular files: `index.html`, `styles.css`, `script.js`, and image assets.
- Validated cross-browser rendering and mobile responsiveness prior to deployment.

### 2 · IAM Security Configuration

- Provisioned a dedicated IAM user — all operations performed without root account access.
- Scoped IAM policies to grant only the permissions required for S3, Route 53, ACM, and CloudFront.
- Followed the **principle of least privilege** throughout the deployment lifecycle.

### 3 · S3 Static Hosting

- Created an S3 bucket (`usmanaws.com`) with static website hosting enabled.
- Configured `index.html` as the default root document.
- Uploaded all production assets and verified the S3 website endpoint.
- Applied a bucket policy restricting direct public access — all traffic routed through CloudFront via Origin Access Control (OAC).

> ✅ **Result:** Website accessible via S3 website endpoint for origin validation.

### 4 · Route 53 DNS Configuration

- Registered the custom domain `usmanaws.com` through Route 53.
- Created a **Public Hosted Zone** and configured NS records.
- Provisioned an **A Record (Alias)** initially pointing to the S3 website endpoint for baseline DNS verification.

> ✅ **Result:** Custom domain resolving to hosted content.

### 5 · TLS Certificate via ACM

- Requested a public SSL/TLS certificate covering both `usmanaws.com` and `www.usmanaws.com`.
- Completed domain ownership validation using the **DNS validation method** with CNAME records auto-created in Route 53.
- Provisioned the certificate in `us-east-1` (required by CloudFront for edge distribution).
- Confirmed certificate status transitioned to **Issued** before proceeding.

> ✅ **Result:** Trusted TLS certificate ready for CloudFront attachment.

### 6 · CloudFront Distribution

- Created a CloudFront distribution with the S3 website endpoint configured as the origin.
- Attached the ACM certificate and added `usmanaws.com` as an **Alternate Domain Name (CNAME)**.
- Enabled **HTTP → HTTPS redirect** to enforce encrypted connections globally.
- Configured Origin Access Control (OAC) to ensure the S3 bucket only accepts requests originating from CloudFront.
- Tuned default cache behavior for optimal TTL and cache-hit ratio.

> ✅ **Result:** Site delivered over HTTPS with global edge caching.

### 7 · DNS Cutover to CloudFront

- Updated the Route 53 **A Record (Alias)** target from the S3 endpoint to the CloudFront distribution domain.
- Monitored DNS propagation and confirmed resolution via `dig` and browser validation.
- Verified end-to-end HTTPS access with valid certificate chain.

> ✅ **Result:** Production deployment complete — all traffic flows through CloudFront with TLS termination.

---

## Final Architecture Summary

| Capability | Implementation |
|------------|----------------|
| Custom domain | `usmanaws.com` via Route 53 |
| HTTPS encryption | ACM-managed TLS certificate |
| CDN performance | CloudFront edge caching across global PoPs |
| Static hosting | S3 with OAC-restricted origin access |
| DNS routing | Route 53 alias A-record → CloudFront |
| Access control | IAM least-privilege policies, no root account usage |

---

## Why This Project Matters

This isn't a tutorial follow-along — it's a ground-up infrastructure deployment that mirrors real-world cloud engineering workflows:

- **Infrastructure provisioning** — standing up and configuring interconnected AWS services from scratch.
- **Security-first design** — IAM scoping, OAC enforcement, HTTPS-only delivery, and no public S3 access.
- **DNS and domain lifecycle** — registration, hosted zone management, alias routing, and propagation validation.
- **CDN and performance optimization** — edge distribution, cache behaviors, and origin shielding.
- **Certificate management** — provisioning, DNS validation, regional constraints, and attachment to distributions.

Each decision in this project reflects the kind of infrastructure thinking expected in a **Cloud Engineer** or **DevOps** role — balancing security, performance, cost, and operational simplicity.

---

## Project Structure

```
cloud-resume-aws/
├── index.html      # Semantic HTML resume
├── styles.css      # Custom dark-theme stylesheet
├── script.js       # Interactive timeline & animations
├── headshot.jpg    # Profile image
└── README.md       # This file
```

---

## Author

**Usman Motiwala**
B.S. Computer Information Systems — University of Houston (Expected May 2026)
AWS Certified Cloud Practitioner

[LinkedIn](https://www.linkedin.com/in/usman-motiwala-64260b1ba/) · [GitHub](https://github.com/usmanmotiwala17)
