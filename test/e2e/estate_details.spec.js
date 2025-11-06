describe("E2E: Estate Details View", function() {
	beforeEach(function() {
		browser().navigateTo('/');

	});

	it('should show the correct Estate title', function() {
		browser().navigateTo('#/estate/1');

		expect(element('.rs-estate-title').html()).toBe(
			'Wohnung in Lindau'
		);
		expect(element('.rs-estate-qm').html()).toBe(
			'130'
		);
		expect(element('.rs-estate-baujahr').html()).toBe(
			'1999'
		);
	});
});