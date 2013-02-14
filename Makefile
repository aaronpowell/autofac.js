REPORTER=spec
RUNNER=$(BASE)node_modules/mocha/bin/mocha
TESTS=$(BASE)test

tests:
	@echo "Running tests"
	node $(RUNNER) $(TESTS) --reporter $(REPORTER)

tests-dbg:
	@echo "Running tests"
	node $(RUNNER) $(TESTS) --reporter $(REPORTER) --debug-brk
