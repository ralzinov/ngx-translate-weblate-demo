Issues:
- if we change english string in code we are changing the key in all locales and that require re-translation everywhere
- ngx-translate-extract
	- marker must be imported by exact path: "@biesbjerg/ngx-translate-extract-marker"
	- it may broke if uncompilable version of TS used in project
	- it extracts from comments too


Useful links:
https://unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html
http://userguide.icu-project.org/formatparse/messages
https://messageformat.github.io/messageformat/page-guide
