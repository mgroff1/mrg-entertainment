<h1>Contact Me</h1>

<form class="contact-form">
	<input type="text" placeholder="Your Name" required />
	<input type="email" placeholder="Your Email" required />
	<textarea placeholder="Your Message" required></textarea>
	<button type="submit">Send Message</button>
</form>

<style>
	h1 {
		color: #fff;
		margin-bottom: 1rem;
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 400px;
	}

	input,
	textarea {
		padding: 0.8rem;
		background: #1a1d22;
		border: 1px solid #22262c;
		border-radius: 6px;
		color: #d1d5db;
	}

	button {
		padding: 0.8rem;
		background: #3b82f6;
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
	}

	button:hover {
		background: #60a5fa;
	}
</style>
