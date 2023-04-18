---
title: 'Apache NiFi'
date: '2022-09-05'
description: 'Apache NiFi was made for dataflow. It supports highly configurable directed graphs of data routing, transformation, and system mediation logic.'
image: 'apachenifi.png'
githubLink: 'https://github.com/apache/nifi'
primaryTags: ['contributor']
secondaryTags: ['openSource']
languages: ['java']
platforms: ['docker']
---

See the [NIFI-10192 Caffeine cache schema request for reuse PR](https://github.com/apache/nifi/pull/6364) for contribution details.

## Caffeine cache schema request for reuse

### Issue

- Jira Issue: [NIFI-10192](https://issues.apache.org/jira/browse/NIFI-10192)

A change was implemented in [NIFI-9903](https://issues.apache.org/jira/browse/NIFI-9903) which results in lookupService.lookup() being called twice per record ([at least until the first match](https://github.com/apache/nifi/blob/rel/nifi-1.16.1/nifi-nar-bundles/nifi-standard-bundle/nifi-standard-processors/src/main/java/org/apache/nifi/processors/standard/LookupRecord.java#L350)). For lookup services which are idempotent (CSVRecordLookupService, DistributedMapCacheLookupService, PropertiesFileLookupService) making lookups twice won’t affect the result or have undesired side effects. However, the RestLookupService can make arbitrary HTTP requests for the standard HTTP methods (GET, POST, PUT, DELETE) and there is no guarantee that these requests will be idempotent. POST requests in particular are not expected to be idempotent and may cause undesirable behaviour if invoked multiple times (as in our case).

As the name suggests, LookupRecord could be expected to be used only to perform lookups which are idempotent and do not have side effects. [Matt Burgess wrote an article](http://funnifi.blogspot.com/2018/08/database-sequence-lookup-with.html) where it seems the expected behaviour was that lookupService.lookup() would only be called once. The change in behaviour and being called twice would now cause IDs to be skipped.

It was suggested by Mark Payne in a Slack discussion that lookup results could be cached up until the first match, which may alleviate the issues we are seeing.

### Solution

Caffeine cache was added to LookupRecord to cache the results of lookupService.lookup() until the first match. This will prevent the lookupService.lookup() from being called twice per record and will also prevent the lookupService.lookup() from being called after the first match.

## NiFi Overview

Apache NiFi was made for dataflow. It supports highly configurable directed graphs of data routing, transformation, and system mediation logic. Some of its key features include:

- Web-based user interface
  - Seamless experience for design, control, and monitoring
  - Multi-tenant user experience
- Highly configurable
  - Loss tolerant vs guaranteed delivery
  - Low latency vs high throughput
  - Dynamic prioritization
  - Flows can be modified at runtime
  - Back pressure
  - Scales up to leverage full machine capability
  - Scales out with zero-leader clustering model
- Data Provenance
  - Track dataflow from beginning to end
- Designed for extension
  - Build your own processors and more
  - Enables rapid development and effective testing
- Secure
  - SSL, SSH, HTTPS, encrypted content, etc...
  - Pluggable fine-grained role-based authentication/authorization
  - Multiple teams can manage and share specific portions of the flow
