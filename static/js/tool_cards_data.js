// Tool Cards Data - Parsed from .tex files

const toolsData = [
  {
    id: 'base_generator',
    name: 'Base Generator',
    icon: '💡',
    description: 'A generalized tool that takes query from the user, and answers the question step by step to the best of its ability. It can also accept an image.',
    inputs: [
      { name: 'query', type: 'str', desc: 'The query that includes query from the user to guide the agent to generate response.' }
    ],
    output: { type: 'str', desc: 'The generated response to the original query' },
    demoCommands: [
      {
        command: 'execution = tool.execute(query="Summarize the following text in a few lines")',
        description: 'Generate a short summary given the query from the user.'
      }
    ],
    limitations: [
      'The Base Generator may provide hallucinated or incorrect responses.'
    ],
    bestPractices: [
      'Use it for general queries or tasks that don\'t require specialized knowledge or specific tools in the toolbox.',
      'Provide clear, specific query.',
      'Use it to answer the original query through step by step reasoning for tasks without complex or multi-step reasoning.',
      'For complex queries, break them down into subtasks and use the tool multiple times.',
      'Use it as a starting point for complex tasks, then refine with specialized tools.',
      'Verify important information from its responses.'
    ],
    llmRequired: true,
    codeLink: 'https://github.com/lupantech/AgentFlow/tree/main/agentflow/agentflow/tools/base_generator/tool.py'
  },
  {
    id: 'python_coder',
    name: 'Python Coder',
    icon: '🐍',
    description: 'A tool that generates and executes simple Python code snippets for basic arithmetical calculations and math-related problems. The generated code runs in a highly restricted environment with only basic mathematical operations available.',
    inputs: [
      { name: 'query', type: 'str', desc: 'A clear, specific description of the arithmetic calculation or math problem to be solved, including any necessary numerical inputs.' }
    ],
    output: { type: 'dict', desc: 'A dictionary containing the generated code, calculation result, and any error messages.' },
    demoCommands: [
      {
        command: 'execution = tool.execute(query="Find the sum of prime numbers up to 50")',
        description: 'Generate a Python code snippet to find the sum of prime numbers up to 50.'
      },
      {
        command: 'query="Given the list [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], calculate the sum of squares of odd numbers"\nexecution = tool.execute(query=query)',
        description: 'Generate a Python function for a specific mathematical operation on a given list of numbers.'
      }
    ],
    limitations: [
      'Restricted to basic Python arithmetic operations and built-in mathematical functions.',
      'Cannot use any external libraries or modules, including those in the Python standard library.',
      'Limited to simple mathematical calculations and problems.',
      'Cannot perform any string processing, data structure manipulation, or complex algorithms.',
      'No access to any system resources, file operations, or network requests.',
      'Cannot use \'import\' statements.',
      'All calculations must be self-contained within a single function or script.',
      'Output is limited to numerical results or simple lists/tuples of numbers.',
      'DO NOT generate loop output.'
    ],
    bestPractices: [
      'Provide clear and specific queries that describe the desired mathematical calculation.',
      'Include all necessary numerical inputs directly in the query string.',
      'Keep tasks focused on basic arithmetic, algebraic calculations, or simple mathematical algorithms.',
      'Ensure all required numerical data is included in the query.',
      'Verify that the query only involves mathematical operations and does not require any data processing or complex algorithms.',
      'Review generated code to ensure it only uses basic Python arithmetic operations and built-in math functions.'
    ],
    llmRequired: true,
    codeLink: 'https://github.com/lupantech/AgentFlow/tree/main/agentflow/agentflow/tools/python_coder/tool.py'
  },
  {
    id: 'google_search',
    name: 'Google Search',
    icon: '🔍',
    description: 'A web search tool powered by Google Search that provides real-time information from the internet with citation support.',
    inputs: [
      { name: 'query', type: 'str', desc: 'The search query to find information on the web.' },
      { name: 'add_citations', type: 'bool', desc: 'Whether to add citations to the results. If True, the results will be formatted with citations. By default, it is True.' }
    ],
    output: { type: 'str', desc: 'The search results of the query.' },
    demoCommands: [
      {
        command: 'execution = tool.execute(query="What is the capital of France?")',
        description: 'Search for general information about the capital of France with default citations enabled.'
      },
      {
        command: 'execution = tool.execute(query="Who won the euro 2024?", add_citations=False)',
        description: 'Search for information about the Euro 2024 winner without citations.'
      }
    ],
    limitations: [
      'This tool is only suitable for general information search.',
      'This tool contains less domain-specific information.',
      'This tool is not suitable for searching and analyzing videos on YouTube or other video platforms.'
    ],
    bestPractices: [
      'Choose this tool when you want to search for general information about a topic.',
      'Choose this tool for question types of query, such as "What is the capital of France?" or "Who invented the telephone?".',
      'The tool will return summarized information.',
      'This tool is more suitable for definition, world knowledge, and general information search.'
    ],
    llmRequired: false,
    codeLink: 'https://github.com/lupantech/AgentFlow/tree/main/agentflow/agentflow/tools/google_search/tool.py'
  },
  {
    id: 'wikipedia_search',
    name: 'Wikipedia Search',
    icon: '📚',
    description: 'A tool that searches Wikipedia and returns relevant pages with their page titles, URLs, abstract, and retrieved information based on a given query.',
    inputs: [
      { name: 'query', type: 'str', desc: 'The search query for Wikipedia.' }
    ],
    output: { type: 'dict', desc: 'A dictionary containing search results, all matching pages with their content, URLs, and metadata.' },
    demoCommands: [
      {
        command: 'execution = tool.execute(query="What is the exact mass in kg of the moon")',
        description: 'Search Wikipedia and get the information about the mass of the moon.'
      },
      {
        command: 'execution = tool.execute(query="Function of human kidney")',
        description: 'Search Wikipedia and get the information about the function of the human kidney.'
      },
      {
        command: 'execution = tool.execute(query="When was the first moon landing?")',
        description: 'Search Wikipedia and get the information about the first moon landing.'
      }
    ],
    limitations: [
      'It is designed specifically for retrieving grounded information from Wikipedia pages only.',
      'Filtering of relevant pages depends on LLM model performance and may not always select optimal pages.',
      'The returned information accuracy depends on Wikipedia\'s content quality.'
    ],
    bestPractices: [
      'Use specific, targeted queries rather than broad or ambiguous questions.',
      'The tool automatically filters for relevant pages using LLM-based selection - trust the "relevant_pages" results.',
      'If initial results are insufficient, examine the "other_pages" section for additional potentially relevant content.',
      'Use this tool as part of a multi-step research process rather than a single source of truth.',
      'You can use the Web Search to get more information from the URLs.'
    ],
    llmRequired: true,
    codeLink: 'https://github.com/lupantech/AgentFlow/tree/main/agentflow/agentflow/tools/wikipedia_search/tool.py'
  },
  {
    id: 'web_search',
    name: 'Web Search',
    icon: '🌐',
    description: 'A specialized tool for answering questions by retrieving relevant information from a given website using RAG (Retrieval-Augmented Generation).',
    inputs: [
      { name: 'query', type: 'str', desc: 'The search query for the website.' },
      { name: 'url', type: 'str', desc: 'The URL of the website to retrieve information from.' }
    ],
    output: { type: 'str', desc: 'The answer to the user\'s query based on the information gathered from the website.' },
    demoCommands: [
      {
        command: 'execution = tool.execute(query="What is the exact mass in kg of the moon?", url="https://en.wikipedia.org/wiki/Moon")',
        description: 'Retrieve information about the moon\'s mass from Wikipedia.'
      },
      {
        command: 'execution = tool.execute(query="What are the main features of Python programming language?", url="https://www.python.org/about/apps/")',
        description: 'Get information about Python features from the official website.'
      }
    ],
    limitations: [
      'Requires valid URLs that are accessible and contain text content.',
      'May not work with JavaScript-heavy websites or those requiring authentication.',
      'Performance depends on the quality and relevance of the website content.',
      'May return incomplete or inaccurate information if the website content is not comprehensive.',
      'Limited by the chunking and embedding process which may miss context.',
      'Requires OpenAI API access for embeddings and LLM generation.'
    ],
    bestPractices: [
      'Use specific, targeted queries rather than broad questions.',
      'Ensure the URL is accessible and contains relevant information.',
      'Prefer websites with well-structured, text-rich content.',
      'For complex queries, break them down into smaller, specific questions.',
      'Verify important information from multiple sources when possible.',
      'Use it as part of a multi-step research process rather than a single source of truth.',
      'It is highly recommended to use this tool after calling other web-based tools (e.g., Google Search, Wikipedia Search, etc.) to get the real, accessible URLs.'
    ],
    llmRequired: true,
    codeLink: 'https://github.com/lupantech/AgentFlow/tree/main/agentflow/agentflow/tools/web_search/tool.py'
  }
];
