<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<section>
	<h2>Contact me</h2>
	<p>If you would like to contact me please fill in the form below:</p>

	{#if form?.success}
		<p class="success-message">{form.message}</p>
	{:else}
		<form method="POST" use:enhance action="?/submitContact">
			<fieldset>
				<label>
					Name
					<input name="first_name" placeholder="First name" autocomplete="given-name" />
				</label>
				<label>
					Email
					<input type="email" name="email" placeholder="Email" autocomplete="email" />
				</label>

				<label>
					Message
					<textarea name="message" placeholder="Your message"></textarea>
				</label>
			</fieldset>

			<input type="submit" value="Subscribe" />
		</form>
	{/if}
</section>

<style>
	.success-message {
		color: green;
		padding: 1rem;
		border: 1px solid green;
		border-radius: 4px;
		margin: 1rem 0;
	}
</style>
