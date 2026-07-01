<script>
	import { goto } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';
	import Etsy from '$lib/EtsyIcon.svelte';
	function navigate(path) {
		goto(path);
	}

	// State variables for form handling
	let isSubmitting = false;
	let showSuccess = false;
	let errorMessage = '';

	async function handleSubmit(event) {
		// Prevent the default browser form submission (redirect)
		event.preventDefault();
		isSubmitting = true;
		errorMessage = '';

		const form = event.target;
		const data = new FormData(form);

		try {
			const response = await fetch(form.action, {
				method: form.method,
				body: data,
				headers: {
					Accept: 'application/json' // Tells Formspree to return JSON instead of HTML
				}
			});

			if (response.ok) {
				showSuccess = true;
				form.reset(); // Clear the form fields

				// Auto-close popup after 5 seconds
				setTimeout(() => {
					showSuccess = false;
				}, 5000);
			} else {
				const result = await response.json();
				if (Object.hasOwn(result, 'errors')) {
					errorMessage = result.errors.map((error) => error.message).join(', ');
				} else {
					errorMessage = 'Oops! There was a problem submitting your form.';
				}
			}
		} catch (error) {
			errorMessage = 'Oops! There was a problem connecting. Please try again later.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="contact-container">
	<!-- Success Popup Overlay -->
	{#if showSuccess}
		<div class="popup-overlay" transition:fade={{ duration: 200 }}>
			<div class="popup-content" transition:fly={{ y: 20, duration: 300 }}>
				<div class="success-icon">✓</div>
				<h2>Message Sent!</h2>
				<p>Thanks for reaching out. I'll get back to you soon.</p>
				<button class="close-btn" onclick={() => (showSuccess = false)}>Close</button>
			</div>
		</div>
	{/if}

	<div class="contact-card">
		<!-- Shell A: The Form -->
		<div class="shell-a form-section">
			<h1>Contact Me</h1>
			<!-- Added the custom on:submit handler here -->
			<form
				class="contact-form"
				action="https://formspree.io/f/mzbdwoob"
				method="POST"
				onsubmit={handleSubmit}
			>
				<div class="input-group">
					<label for="name">Name</label>
					<input
						type="text"
						id="name"
						name="name"
						placeholder="John Doe"
						required
						disabled={isSubmitting}
					/>
				</div>

				<div class="input-group">
					<label for="email">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="john@example.com"
						required
						disabled={isSubmitting}
					/>
				</div>

				<div class="input-group">
					<label for="message">Message</label>
					<textarea
						id="message"
						name="message"
						placeholder="How can we work together?"
						rows="5"
						required
						disabled={isSubmitting}
					></textarea>
				</div>

				{#if errorMessage}
					<div class="error-message">{errorMessage}</div>
				{/if}

				<button type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Sending...' : 'Send Message'}
				</button>
			</form>
		</div>

		<!-- Shell B: The Info & Links -->
		<div class="shell-b info-section">
			<h2>Let's Connect</h2>
			<p>
				Feel free to reach out for collaborations, questions, or just to say hi! I’m always open to
				connecting with fellow developers, creatives, and anyone interested in my work. You can also
				find me on:
			</p>

			<div class="social-links">
				<a href="https://www.facebook.com/mick.groff76/" target="_blank" rel="noopener noreferrer">
					<span class="icon">f</span> Facebook
				</a>
				<a
					href="https://github.com/mgroff1?tab=repositories"
					target="_blank"
					rel="noopener noreferrer"
				>
					<span class="icon">🐙</span> GitHub
				</a>
				<a
					href="https://www.linkedin.com/in/mick-groff-7120a51b9/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<span class="icon">in</span> LinkedIn
				</a>
				<a
					href="https://www.etsy.com/shop/MRGEntertainment"
					target="_blank"
					rel="noopener noreferrer"
				>
					<span class="icon">E</span> Etsy Shop
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	.contact-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 80vh;
		padding: 2rem;
		box-sizing: border-box;
		position: relative;
	}

	/* Popup Styles */
	.popup-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(4px);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 100;
	}

	.popup-content {
		background: #16191e;
		border: 1px solid #22262c;
		border-radius: 16px;
		padding: 2.5rem;
		text-align: center;
		max-width: 400px;
		width: 90%;
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
	}

	.success-icon {
		width: 64px;
		height: 64px;
		background: rgba(16, 185, 129, 0.1);
		color: #10b981;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 2rem;
		font-weight: bold;
		margin: 0 auto 1.5rem auto;
	}

	.popup-content h2 {
		color: #fff;
		margin: 0 0 0.5rem 0;
	}

	.popup-content p {
		color: #9ca3af;
		margin-bottom: 2rem;
		line-height: 1.5;
	}

	.close-btn {
		width: 100%;
		background: #3b82f6;
		color: white;
		padding: 0.8rem;
		border: none;
		border-radius: 8px;
		font-weight: 600;
		font-size: 1rem;
		cursor: pointer;
		transition: background 0.2s;
	}

	.close-btn:hover {
		background: #2563eb;
	}

	.error-message {
		color: #ef4444;
		font-size: 0.9rem;
		background: rgba(239, 68, 68, 0.1);
		padding: 0.8rem;
		border-radius: 8px;
		border: 1px solid rgba(239, 68, 68, 0.2);
	}

	/* Main Card Styles */
	.contact-card {
		display: flex;
		flex-direction: row;
		background: #111317;
		border: 1px solid #1f2126;
		border-radius: 16px;
		overflow: hidden;
		max-width: 1000px;
		width: 100%;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
	}

	.form-section {
		flex: 1.2;
		padding: 3rem;
		background: #0f1115;
	}

	.form-section h1 {
		color: #fff;
		margin: 0 0 1.5rem 0;
		font-size: 2.2rem;
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	label {
		font-size: 0.9rem;
		color: #9ca3af;
		font-weight: 500;
	}

	input,
	textarea {
		padding: 0.9rem;
		background: #16191e;
		border: 1px solid #22262c;
		border-radius: 8px;
		color: #e5e7eb;
		font-family: inherit;
		font-size: 1rem;
		transition:
			border-color 0.2s,
			box-shadow 0.2s,
			opacity 0.2s;
		width: 100%;
		box-sizing: border-box;
	}

	input:disabled,
	textarea:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	input:focus:not(:disabled),
	textarea:focus:not(:disabled) {
		outline: none;
		border-color: #3b82f6;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
	}

	textarea {
		resize: vertical;
		min-height: 120px;
	}

	button[type='submit'] {
		margin-top: 0.5rem;
		padding: 1rem;
		background: #3b82f6;
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 1.05rem;
		font-weight: 600;
		cursor: pointer;
		transition:
			background 0.2s,
			transform 0.1s,
			opacity 0.2s;
	}

	button[type='submit']:hover:not(:disabled) {
		background: #2563eb;
	}

	button[type='submit']:active:not(:disabled) {
		transform: translateY(1px);
	}

	button[type='submit']:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	/* Info Section (Shell B) */
	.info-section {
		flex: 1;
		padding: 3rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.info-section h2 {
		color: #fff;
		margin: 0 0 1rem 0;
		font-size: 1.8rem;
	}

	.info-section p {
		color: #9ca3af;
		line-height: 1.6;
		margin-bottom: 2rem;
		font-size: 1.05rem;
	}

	.social-links {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.social-links a {
		display: flex;
		align-items: center;
		gap: 12px;
		color: #d1d5db;
		text-decoration: none;
		padding: 12px 16px;
		background: #1a1d24;
		border: 1px solid #22262c;
		border-radius: 8px;
		transition:
			background 0.2s,
			color 0.2s,
			border-color 0.2s;
		font-weight: 500;
	}

	.social-links a:hover {
		background: #1f2937;
		border-color: #3b82f6;
		color: #fff;
	}

	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		font-weight: bold;
		color: #3b82f6;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.contact-card {
			flex-direction: column;
		}

		.form-section,
		.info-section {
			padding: 2rem;
		}

		.info-section {
			border-top: 1px solid #1f2126;
		}
	}
</style>
