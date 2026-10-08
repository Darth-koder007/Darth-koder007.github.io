# CV

`cv.yaml` is the single source of truth for the resume, in
[RenderCV](https://docs.rendercv.com/) format.

On every push to `main` that touches `cv/**`, `.github/workflows/render-cv.yml` renders it and
commits the resulting PDF to `public/cv.pdf`, which that commit's own push then publishes via the
existing site deploy to `https://darth-koder007.github.io/cv.pdf`.

**One-time setup:** that workflow pushes using a PAT (`secrets.CV_DEPLOY_PAT`), not the default
`GITHUB_TOKEN` — GitHub doesn't let the default token's pushes trigger other workflows, and this
commit needs to trigger `deploy.yml`. Create a fine-grained PAT scoped to this repo with
"Contents: Read and write" permission, then add it as a repo secret named `CV_DEPLOY_PAT`
(Settings → Secrets and variables → Actions).

## Editing

Edit `cv.yaml` and push to `main` — CI does the rest.

## Previewing locally

```sh
pip install "rendercv[full]"
cd cv && rendercv render cv.yaml
```

Open `cv/rendercv_output/Vijay_Singh_CV.pdf`. Don't commit `rendercv_output/` — it's generated.
