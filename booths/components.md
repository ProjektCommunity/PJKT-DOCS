# 🧩 Booth Components

SDK prefabs for interactive booth elements. All prefabs ship in `Assets\PJKT\Pjkt Prefabs` after you import the package.

## ⭐ Getting Started

<div class="getting-started-grid">
  <div class="setting-card getting-started-card">
    <div class="getting-started-card__step">Step 1</div>
    <h3>Install the SDK</h3>
    <p>Set up the SDK and sign in with your representative account before you import any prefabs.</p>
    <a class="getting-started-card__link" href="/booths/getting-started-with-sdk">Open the setup guide →</a>
  </div>

  <div class="setting-card getting-started-card">
    <div class="getting-started-card__step">Step 2</div>
    <h3>Add the prefab package</h3>
    <p>Open <code>PJKT SDK → ⚙️ Settings</code>, find <strong>PJKT Prefabs</strong>, and click <strong>Add to scene</strong>.</p>
    <p class="getting-started-card__note">If you already imported an older version, remove <code>Assets\PJKT\Pjkt Prefabs</code> first.</p>
  </div>
</div>


## ⚡ Example Prefabs

- Example prefabs for each component can be found in `Assets\PJKT\PJKT Prefabs`. These are fully functional, fully setup and can be used as-is.

## 📍 TeleportPlayer

Moves visitors to a fixed destination. Use this when you want a button or interact trigger that sends someone to a specific spot in your booth.

<div class="setting-card">
<strong>Teleport Destination</strong> <span class="req">required</span><br>
The Transform where players land.
</div>

<div class="setting-card">
<strong>UI Buttons</strong><br>
Unity UI buttons that trigger the teleport when clicked.
</div>

<div class="setting-card">
<strong>One-time Use</strong><br>
Disables the teleport after its first use.
</div>

::: tip
Use the inspector gizmos to preview the landing position.
:::

<div class="demo-gallery demo-gallery--double">
  <figure class="demo-card">
    <figcaption class="demo-card__meta">
      <strong>In-world demo</strong>
      <span>Click the preview to expand it.</span>
    </figcaption>
    <video class="demo-video" controls preload="metadata">
      <source src="/Booths/TeleportDemo.mp4" type="video/mp4">
    </video>
  </figure>

  <figure class="demo-card">
    <figcaption class="demo-card__meta">
      <strong>Editor tool demo</strong>
      <span>Click the preview to expand it.</span>
    </figcaption>
    <video class="demo-video" controls preload="metadata">
      <source src="/Booths/TeleportEditorToolDemo.mp4" type="video/mp4">
    </video>
  </figure>
</div>

---

## ♻️ ResetPickups

Resets VRCObjectSync objects to their original positions. Use this when your booth has throwable or moveable objects that visitors might scatter around.

<div class="setting-card">
<strong>Pickups To Reset</strong> <span class="req">required</span><br>
The VRCObjectSync components to reset.
</div>

<div class="setting-card">
<strong>Use Whitelist</strong><br>
Restricts who can trigger the reset.
</div>

<div class="setting-card">
<strong>Allowed Users</strong><br>
Usernames allowed to reset (when whitelist is on).
</div>

<div class="setting-card">
<strong>UI Buttons</strong><br>
Unity UI buttons that trigger the reset.
</div>

<div class="demo-gallery">
  <figure class="demo-card">
    <figcaption class="demo-card__meta">
      <strong>Pickup reset demo</strong>
      <span>Click the preview to expand it.</span>
    </figcaption>
    <video class="demo-video" controls preload="metadata">
      <source src="/Booths/PickupResetDemo.mp4" type="video/mp4">
    </video>
  </figure>
</div>

---

## 👥 OpenGroupInformationContainer

Opens your VRChat group page or store when a visitor interacts. Use this when you want a direct link button to your community.

<div class="setting-card">
<strong>Group ID</strong> <span class="req">required</span><br>
Your group's UUID — `grp_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
</div>

<div class="setting-card">
<strong>Open To Store</strong><br>
Opens the store page instead of the group info page.
</div>

<div class="setting-card">
<strong>UI Buttons</strong><br>
Unity UI buttons that trigger the open action.
</div>

::: tip
Find your Group ID in the URL when viewing your group on VRChat.com: `vrchat.com/home/group/grp_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
:::

<div class="demo-gallery">
  <figure class="demo-card">
    <figcaption class="demo-card__meta">
      <strong>Group link demo</strong>
      <span>Click the preview to expand it.</span>
    </figcaption>
    <video class="demo-video" controls preload="metadata">
      <source src="/Booths/GroupOpenDemo.mp4" type="video/mp4">
    </video>
  </figure>
</div>

---

## 🎛️ ButtonToggle

Shows, hides, or animates objects. Use this when you want an on/off button for decorations, panels, displays, or any game object.

<div class="setting-card">
<strong>Objects To Toggle</strong><br>
GameObjects to show/hide.
</div>

<div class="setting-card">
<strong>Animator Settings</strong><br>
Animator reference + boolean parameter names to flip.
</div>

<div class="setting-card">
<strong>UI Elements</strong><br>
UI buttons and toggle controls.
</div>

<div class="setting-card">
<strong>Starting State</strong><br>
Initial state when a player loads in.
</div>

<div class="setting-card">
<strong>One-time Use</strong><br>
Disables itself after first use.
</div>

**Starting State options**

- **Do Nothing** — Keeps editor state, inverts on each press
- **Enable All** — Starts with all objects visible
- **Disable All** — Starts with all objects hidden

<div class="demo-gallery">
  <figure class="demo-card">
    <figcaption class="demo-card__meta">
      <strong>Object toggle demo</strong>
      <span>Click the preview to expand it.</span>
    </figcaption>
    <video class="demo-video" controls preload="metadata">
      <source src="/Booths/ObjectToggleDemo.mp4" type="video/mp4">
    </video>
  </figure>
</div>

---

## 🌐 PjktLanguageSwitcher

Shows TextMeshPro text in each visitor's VRChat language. Refreshes on join and whenever a player changes their language setting.

<div class="setting-card">
<strong>Language</strong> <span class="req">required</span><br>
The language for this text entry.
</div>

<div class="setting-card">
<strong>Text Field</strong> <span class="req">required</span><br>
What to display in that language.
</div>

<div class="setting-card">
<strong>Add language override</strong><br>
Click to add another language entry.
</div>

::: tip
A TextMeshProUGUI component will be created automatically if one doesn't already exist on the GameObject.
:::

---

## 🎨 PjktMaterialSwapper

Applies different materials per build target. Use this when your PC shaders would go pink on Quest, or when you want per-platform material control.

<div class="setting-card">
<strong>Renderer</strong> <span class="req">required</span><br>
The Renderer to swap. Auto-wired when you add the component.
</div>

<div class="setting-card">
<strong>Windows Materials</strong><br>
Materials for PC builds.
</div>

<div class="setting-card">
<strong>Android Materials</strong><br>
Materials for Quest builds.
</div>

<div class="setting-card">
<strong>iOS Materials</strong><br>
Materials for iOS builds.
</div>

---

## 🎬 PjktBoothVideoPlayer

Plays a video on an in-booth screen. Use this when you want video content — trailers, showcases, background footage — on a physical screen in your booth.

<div class="setting-card">
<strong>Video URL</strong> <span class="req">required</span><br>
URL of the video to play. Use a VRChat-whitelisted URL.
</div>

<div class="setting-card">
<strong>Autoplay</strong><br>
Starts playback when a player enters the trigger collider. **PC only** — does not work on Quest.
</div>

<div class="setting-card">
<strong>Loop</strong><br>
Restarts the video when it ends.
</div>

<div class="setting-card">
<strong>Standby Texture</strong><br>
Image shown on the screen when no video is active.
</div>

::: warning
Autoplay does not run on Quest. Players must also be standing inside the trigger collider before autoplay occurs, on Quest/iOS the play button must be pressed to start the video.
:::

---

## 🛠️ Troubleshooting

**Components not working?**  
Check that all required colliders and UI references are assigned. Every prefab needs its inspector fields filled in.

**Group ID not working?**  
Must match the full UUID format exactly: `grp_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

**UI button not doing anything?**  
Check the On Click events on the button and confirm an EventSystem is present in the scene.

**Still stuck?**  
Ask in the representative channels on our Discord.

<style>
.setting-card {
  margin: 0.75rem 0;
  padding: 0.85rem 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}
.setting-card:hover {
  transform: translateY(-1px);
  border-color: var(--vp-c-divider);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}
.getting-started-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
  margin: 1rem 0 1.5rem;
}
.getting-started-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin: 0;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}
.getting-started-card:hover {
  transform: translateY(-2px);
  border-color: var(--vp-c-divider);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}
.getting-started-card__step {
  display: inline-flex;
  align-self: flex-start;
  padding: 0.3rem 0.65rem;
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}
.getting-started-card h3 {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 1.1rem;
}
.getting-started-card p {
  margin: 0;
  color: var(--vp-c-text-2);
}
.getting-started-card__link {
  font-weight: 700;
  text-decoration: none;
}
.getting-started-card__link:hover {
  text-decoration: underline;
}
.getting-started-card__note {
  padding-top: 0.65rem;
  border-top: 1px dashed var(--vp-c-divider);
  font-size: 0.92rem;
}
.setting-card strong {
  color: var(--vp-c-text-1);
}
.setting-card .req {
  color: var(--pjkt-yellow, #FFE400);
  font-size: 0.85em;
  font-weight: 600;
  margin-left: 0.5em;
}
.demo-gallery {
  display: grid;
  gap: 0.875rem;
  margin: 1rem 0;
}
.demo-gallery--double {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}
.demo-card {
  margin: 0;
  padding: 0.85rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}
.demo-card:hover,
.demo-card:focus-within {
  transform: translateY(-2px);
  border-color: var(--vp-c-divider);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
}
.demo-card:focus-within {
  grid-column: 1 / -1;
}
.demo-card__meta {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-bottom: 0.65rem;
}
.demo-card__meta strong {
  color: var(--vp-c-text-1);
}
.demo-card__meta span {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}
.demo-video {
  display: block;
  width: 100%;
  max-width: min(100%, 15rem);
  aspect-ratio: 16 / 9;
  border-radius: 10px;
  background: #000;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.24);
  transition: max-width 0.22s ease, box-shadow 0.22s ease;
}
.demo-card:focus-within .demo-video {
  max-width: 100%;
  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.3);
}
@media (prefers-reduced-motion: reduce) {
  .getting-started-card,
  .demo-card,
  .demo-video {
    transition: none;
  }
}
</style>
