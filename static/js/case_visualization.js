// Case Study Data
const caseData = {
  1: {
    title: "GameOf24 - Case 1",
    question: "Using the numbers [1, 1, 1, 13], create an expression that equals 24. You must use basic arithmetic operations (+, -, *, /) and parentheses.",
    answer: "(13-1)*(1+1)",
    success: {
      title: "Success Case: AgentFlow w/ Flow-GRPO",
      steps: [
        {
          title: "Action Step 1",
          tool: "Google Search",
          subgoal: "Find a valid arithmetic expression that equals 24 using the numbers [1, 1, 1, 13].",
          command: "[1, 1, 1, 13] arithmetic expression to get 24",
          result: "Found solution: (13 - 1) * (1 + 1) = 24.",
          type: "success"
        }
      ],
      verifier: "PASS, STOP",
      solution: "The arithmetic expression is ((13 - 1) × (1 + 1)) = 24."
    },
    failure: {
      title: "Failure Case: AgentFlow w/o Flow-GRPO",
      steps: [
        {
          title: "Action Step 1",
          tool: "Python Coder",
          subgoal: "Generate and test combinations of [1, 1, 1, 13] to find an expression that equals 24.",
          command: "1 * (13 - 1 - 1)",
          result: "The result of the operation is: 11.",
          type: "error"
        },
        {
          title: "Action Step 2",
          tool: "Python Coder",
          subgoal: "Generate and test combinations of [1, 1, 1, 13]...",
          command: "((1 + 1 + 1) * 13)",
          result: "Error: unexpected indent.",
          type: "error"
        },
        {
          title: "Action Steps 3-8",
          tool: "No matched tool given",
          subgoal: "Generate and test combinations of [1, 1, 1, 13]...",
          command: "Not generated due to tool not found.",
          result: "Not generated due to tool not found. (Tool Not Found)",
          type: "error"
        }
      ],
      verifier: "STOP, Tool Not Found",
      solution: "The agent incorrectly concludes that (1 + 1 + 1) × 13 = 24."
    }
  },
  2: {
    title: "GameOf24 - Case 2",
    question: "Using the numbers [1, 1, 6, 9], create an expression that equals 24. You must use basic arithmetic operations (+, -, *, /) and parentheses.",
    answer: "(1+1)*9+6",
    success: {
      title: "Success Case: AgentFlow w/ Flow-GRPO",
      steps: [
        {
          title: "Action Step 1: Initial Attempt",
          tool: "Python Coder",
          subgoal: "Generate and test a possible arithmetic expression.",
          command: "(1+1)*(9-6)",
          result: "The first expression (1+1)*(9-6) resulted in 6.",
          type: "warning"
        },
        {
          title: "Action Step 2: Tool Error",
          tool: "Python Coder",
          subgoal: "Attempt to generate all permutations with operators.",
          command: "Generate permutations",
          result: "Encountered a recoverable 'eval()' tool error.",
          type: "warning"
        },
        {
          title: "Action Step 3: Second Attempt",
          tool: "Python Coder",
          subgoal: "Generate another combination of numbers and operators.",
          command: "Alternative expression",
          result: "A different expression resulted in 45.0.",
          type: "warning"
        },
        {
          title: "Action Step 4: Systematic Search (Breakthrough)",
          tool: "Python Coder",
          subgoal: "Brute-force all permutations of numbers and operations.",
          command: "Exhaustive search",
          result: "Successfully found a valid expression: (1+1)*9+6 = 24.",
          type: "success"
        },
        {
          title: "Action Step 5: Confused Verification",
          tool: "Python Coder",
          subgoal: "Simplify and verify a promising expression.",
          command: "Verification attempt",
          result: "Agent gets confused, tests an incorrect expression that results in 108.",
          type: "warning"
        },
        {
          title: "Action Step 6: Final Verification",
          tool: "Google Search",
          subgoal: "Search online for a solution to verify the result.",
          command: "Verify solution online",
          result: "External search confirms the solution: (1+1)*9+6 = 24.",
          type: "success"
        }
      ],
      verifier: "PASS, STOP (via exhaustive search and verification)",
      solution: "After a multi-step process of trial, error, and verification, the final correct expression is (1 + 1) * 9 + 6 = 24."
    },
    failure: {
      title: "Failure Case: AgentFlow w/o Flow-GRPO",
      steps: [
        {
          title: "Action Step 1",
          tool: "Python Coder",
          subgoal: "Find an arithmetic expression using [1, 1, 6, 9] to equal 24.",
          command: "Create expression with [1, 1, 6, 9] for 24",
          result: "Generated expression (6*9)-((1+1)*15).",
          type: "error"
        }
      ],
      verifier: "STOP",
      solution: "The agent incorrectly concludes the answer is (6 × 9) - ((1 + 1) × 15), failing to notice it used the number 15, which was not in the allowed input set."
    }
  },
  3: {
    title: "GAIA - Case 1",
    question: "Assuming scientists in the famous youtube video The Thinking Machine (Artificial Intelligence in the 1960s) were interviewed the same year, what is the name of the scientist predicting the sooner thinking machines or robots? Answer using the format First name Last name.",
    answer: "Claude Shannon",
    success: {
      title: "Success Case: AgentFlow w/ Flow-GRPO",
      steps: [
        {
          title: "Action Turn 1",
          tool: "Google Search",
          subgoal: "Search for 'The Thinking Machine' video to identify the scientist predicting AI's future.",
          command: "Scientist in 'The Thinking Machine' predicting sooner thinking machines?",
          result: "Identified Claude Shannon, who predicted robots 'within 10 or 15 years' in the 1961 documentary.",
          type: "success"
        }
      ],
      verifier: "PASS, STOP",
      solution: "The scientist who made the prediction is Claude Shannon."
    },
    failure: {
      title: "Failure Case: AgentFlow w/o Flow-GRPO",
      steps: [
        {
          title: "Action Turn 1",
          tool: "Web Search",
          subgoal: "Identify the scientist who predicted thinking machines in 'The Thinking Machine' video.",
          command: "Who predicted sooner thinking machines in 'The Thinking Machine' video?",
          result: "Page of video does not contain prediction details.",
          type: "error"
        },
        {
          title: "Action Turn 2",
          tool: "Google Search",
          subgoal: "Find scientist who predicted thinking machines in 'The Thinking Machine' video.",
          command: "Scientist predicted thinking machines 'The Thinking Machine' 1960s?",
          result: "Jerome Wiesner predicted sooner development of thinking machines.",
          type: "warning"
        },
        {
          title: "Action Turn 3",
          tool: "Google Search",
          subgoal: "Confirm scientist for prediction in 'The Thinking Machine' video.",
          command: "Scientist predicted sooner development 'The Thinking Machine' 1960s?",
          result: "Professor Jerome B. Wiesner made the prediction.",
          type: "warning"
        },
        {
          title: "Action Turn 4",
          tool: "Google Search",
          subgoal: "Find exact year of interview/prediction in 'The Thinking Machine' video.",
          command: "Which scientist predicted sooner development 'The Thinking Machine' 1960s?",
          result: "Wiesner predicted machines would 'really do think' in 'four or 5 years'.",
          type: "warning"
        },
        {
          title: "Action Turn 5",
          tool: "Google Search",
          subgoal: "Find release year of YouTube video 'The Thinking Machine'.",
          command: "When was 'The Thinking Machine' YouTube video released?",
          result: "Original TV program aired Oct 26, 1960. YouTube upload dates vary.",
          type: "warning"
        },
        {
          title: "Action Turn 6",
          tool: "Google Search",
          subgoal: "Find year Jerome Wiesner made prediction in 'The Thinking Machine' video.",
          command: "In which year did Jerome Wiesner make his prediction about thinking machines?",
          result: "Jerome Wiesner made his prediction in 1960.",
          type: "warning"
        }
      ],
      verifier: "STOP, Initial Tool Failure & Inefficient Search Path",
      solution: "The answer is Jerome B. Wiesner. However, the initial direct video search failed, leading to multiple, somewhat redundant Google searches to extract the information."
    }
  },
  4: {
    title: "GAIA - Case 2",
    question: "Compute the check digit the Tropicos ID for the Order Helotiales would have if it were an ISBN-10 number.",
    answer: "3",
    success: {
      title: "Success Case: AgentFlow w/ Flow-GRPO",
      steps: [
        {
          title: "Action Step 1",
          tool: "Wikipedia_RAG_Search_Tool",
          subgoal: "Retrieve the Tropicos ID from the Wikipedia page on Helotiales.",
          command: `execution = tool.execute(query="Tropicos ID of Order Helotiales")`,
          result: `{"query": "Tropicos ID of Order Helotiales", "relevant_pages": [], "other_pages (may be irrelevant to the query)": [{"title": null, "url": null, "abstract": null, "error": "No results found for query: Tropicos ID of Order Helotiales"}]}`,
          type: "warning"
        },
        {
          title: "Action Step 2",
          tool: "Ground_Google_Search_Tool",
          subgoal: "Retrieve the Tropicos ID of Order Helotiales from a reliable online source.",
          command: `execution = tool.execute(query="Tropicos ID of Order Helotiales")`,
          result: `The Tropicos ID for the Order Helotiales is 100370510.[1](https://commons.wikimedia.org/wiki/Category:Helotiales)`,
          type: "success"
        },
        {
          title: "Action Step 3",
          tool: "Python_Code_Generator_Tool",
          subgoal: "Write and execute a Python script to calculate the check digit for `tropicos_id` as if it were an ISBN-10 number.",
          command: `execution = tool.execute(query="Calculate the check digit for the ISBN-10 number " + tropicos_id)`,
          result: `Error in execute_tool_command: name 'tropicos_id' is not defined`,
          type: "warning"
        },
        {
          title: "Action Step 4",
          tool: "Python_Code_Generator_Tool",
          subgoal: "Write and execute a Python script to calculate the check digit for `tropicos_id` as if it were an ISBN-10 number.",
          command: `execution = tool.execute(query="Compute the check digit for 100370510 as an ISBN-10 number")`,
          result: `<pre><code>def calculate_check_digit(isbn):
    # Extract the first 9 digits of the ISBN-10
    isbn_digits = [int(digit) for digit in isbn[:9]]

    # Calculate the sum of products
    total_sum = sum(position * digit for position, digit in enumerate(isbn_digits, start=1))

    # Determine the check digit
    check_digit = total_sum % 11
    if check_digit == 10:
        return 'X'
    else:
        return str(check_digit)

# Given ISBN-10 number
isbn_10 = "100370510"

# Compute the check digit
check_digit_result = calculate_check_digit(isbn_10)

# Print the final result
print(f"The check digit for the ISBN-10 number {isbn_10} is {check_digit_result}")</code></pre><br>Printed output: The check digit for the ISBN-10 number 100370510 is 3`,
          type: "success"
        },
        {
          title: "Action Step 5",
          tool: "Python_Code_Generator_Tool",
          subgoal: "Execute the existing Python script to calculate and print the check digit for `tropicos_id` as an ISBN-10 number.",
          command: `execution = tool.execute(query="Compute the check digit for tropicos_id 100370510 as an ISBN-10 number")`,
          result: `<pre><code>def calculate_isbn10_check_digit(tropicos_id):
    # Step 1: Extract the first 9 digits of the Tropicos ID
    isbn_digits = tropicos_id[:9]

    # Step 2: Initialize the sum for the check digit calculation
    total_sum = 0

    # Step 3: Calculate the sum of the products of each digit and its position
    for i, digit in enumerate(isbn_digits, start=1):
        total_sum += i * int(digit)

    # Step 4: Calculate the check digit
    check_digit = total_sum % 11

    # If the check digit is 10, it is represented as 'X'
    if check_digit == 10:
        check_digit = 'X'

    # Step 5: Format the ISBN-10
    isbn_10 = f"{isbn_digits}{check_digit}"

    return isbn_10

# Given Tropicos ID
tropicos_id = "100370510"

# Step 6: Generate the ISBN-10 and print the result
isbn_10 = calculate_isbn10_check_digit(tropicos_id)
print(f"The ISBN-10 number for the Tropicos ID {tropicos_id} is: {isbn_10}")</code></pre><br>Printed output: The ISBN-10 number for the Tropicos ID 100370510 is: 1003705103`,
          type: "success"
        }
      ],
      verifier: "PASS, STOP",
      solution: "The check digit is 3, resulting in the full number 1003705103."
    },
    failure: {
      title: "Failure Case: AgentFlow w/o Flow-GRPO",
      steps: [
        {
          title: "Action Step 1",
          tool: "Wikipedia_RAG_Search_Tool",
          subgoal: "Retrieve the Tropicos ID of the Order Helotiales from Wikipedia.",
          command: `execution = tool.execute(query="Tropicos ID for the Order Helotiales")`,
          result: `{"query": "Tropicos ID for the Order Helotiales", "relevant_pages": [], "other_pages (may be irrelevant to the query)": [{"title": null, "url": null, "abstract": null, "error": "No results found for query: Tropicos ID for the Order Helotiales"}]}`,
          type: "warning"
        },
        {
          title: "Action Step 2",
          tool: "Ground_Google_Search_Tool",
          subgoal: "Retrieve the Tropicos ID of the Order Helotiales from a reliable web source.",
          command: `execution = tool.execute(query="Tropicos ID for the Order Helotiales", add_citations=True)`,
          result: `The Tropicos ID for the Order Helotiales is 100370510.[1](https://explorer.invariantlabs.ai/u/feixieliz/gaia_magentic-one/t/10), [2](https://commons.wikimedia.org/wiki/Category:Helotiales)`,
          type: "success"
        },
        {
          title: "Action Steps 3-9",
          tool: "Python_Code_Generator_Tool",
          subgoal: "Calculate the check digit for the Tropicos ID 100370510 if it were an ISBN-10 number.",
          command: `execution = tool.execute(query="Calculate the check digit for the ISBN-10 number 100370510")`,
          result: `{"error": "name 'isbn' is not defined"}<br><br><strong>Note:</strong> Action Steps 3 through 9 all have identical subgoals, commands, and error results - the agent is stuck in a repetitive error loop, unable to fix the variable naming issue.`,
          type: "error"
        }
      ],
      verifier: "STOP, Stuck in Repetitive Tool Error",
      solution: "The Python tool failed repeatedly with the same 'isbn' variable error across 7 consecutive attempts (Steps 3-9). The agent was unable to recover from this error and failed to calculate the check digit."
    }
  },
  5: {
    title: "HotpotQA - Case 1",
    question: "Which part of Handel's Messiah covers the birth of a child who, according to the gospels of Luke and Matthew, was born in Bethlehem?",
    answer: "Part I",
    success: {
      title: "Success Case: AgentFlow w/ Flow-GRPO",
      steps: [
        {
          title: "Action Steps 1-2: Initial Failures",
          tool: "Wikipedia Search",
          subgoal: "Find part of Handel's Messiah about Jesus's birth.",
          command: "Initial queries",
          result: "Initial long-form queries failed to find relevant pages.",
          type: "warning"
        },
        {
          title: "Action Step 3: Query Refinement",
          tool: "Wikipedia Search",
          subgoal: "Retry with a simplified keyword search.",
          command: "Handel's Messiah birth of Jesus Bethlehem",
          result: "This successfully identified relevant pages like 'Structure of Handel's Messiah' and 'Messiah Part I'.",
          type: "success"
        },
        {
          title: "Action Steps 4-6: Further Search",
          tool: "Wikipedia Search",
          subgoal: "Continue searching for the specific information.",
          command: "Refined searches",
          result: "Agent gets briefly confused, re-runs a failed query, but then another refined query again locates the main 'Messiah (Handel)' Wikipedia pages.",
          type: "warning"
        },
        {
          title: "Action Step 7: Tool Switching (Breakthrough)",
          tool: "Web Search",
          subgoal: "Search the identified Wikipedia page directly for the answer.",
          command: "Direct page search",
          result: "Success! The tool extracted the answer from the page: Part I, featuring the chorus 'For unto us a child is born'.",
          type: "success"
        }
      ],
      verifier: "PASS, STOP",
      solution: "The relevant section is Part I, which includes the famous chorus 'For unto us a child is born'."
    },
    failure: {
      title: "Failure Case: AgentFlow w/o Flow-GRPO",
      steps: [
        {
          title: "Action Step 1: Initial Wikipedia Search",
          tool: "Wikipedia Search",
          subgoal: "Retrieve information about Handel's Messiah, birth of Jesus.",
          command: "Initial search",
          result: "Returned irrelevant pages (e.g., 'Historical Jesus,' 'Advent'). (No direct answer)",
          type: "warning"
        },
        {
          title: "Action Step 2: Refined Wikipedia Search",
          tool: "Wikipedia Search",
          subgoal: "Refine query for specific part mentioning birth of Jesus.",
          command: "Refined query",
          result: "Still returned mostly irrelevant pages, but 'Messiah Part I' appeared in other suggestions. (Hint found, but no direct answer)",
          type: "warning"
        },
        {
          title: "Action Step 3: Keyword Wikipedia Search",
          tool: "Wikipedia Search",
          subgoal: "Use simpler keywords for 'Handel's Messiah birth of Jesus Bethlehem'.",
          command: "Keyword search",
          result: "Still no direct relevant pages, but 'Structure of Handel's Messiah' and 'Messiah Part I' again appeared. (Still no direct answer)",
          type: "warning"
        },
        {
          title: "Action Steps 4-5: Persistent Wikipedia Queries",
          tool: "Wikipedia Search",
          subgoal: "Repeatedly attempted variations of the query.",
          command: "Multiple variations",
          result: "Consistently returned irrelevant pages like 'Luke 2' and 'Christmas music'. (Wikipedia tool stuck/ineffective for direct answer)",
          type: "error"
        },
        {
          title: "Action Step 6: External Search (Breakthrough)",
          tool: "Google Search",
          subgoal: "Use Google to find the specific part of Handel's Messiah.",
          command: "Google search",
          result: "Successfully found the answer: Part I, specifically 'For unto us a child is born' and the annunciation to the shepherds.",
          type: "success"
        }
      ],
      verifier: "PASS, STOP (via query refinement and external search after Wikipedia limitations)",
      solution: "The part of Handel's Messiah referring to the birth of Jesus in Bethlehem is found in Part I, particularly the chorus 'For unto us a child is born' and the scene depicting the annunciation to the shepherds."
    }
  },
  6: {
    title: "GPQA - Case 1",
    question: "An intelligent civilization in the Large Magellanic Cloud has engineered an extraordinary spacecraft capable of traveling at a substantial fraction of the speed of light. The average lifetime of these aliens is roughly 150 solar years. Now, having Earth as their destination in mind, they are determined to travel with this spacecraft at a constant speed of 0.99999987*c, where c is the speed of light. Approximately, how long will it take for their 22 years old astronaut (from the point of view of the astronaut) to reach the Earth using this incredibly fast spacecraft? Choices: A. 81 years, B. 77 years, C. 72 years, D. The astronaut will die before reaching to the Earth.",
    answer: "A. 81 years",
    success: {
      title: "Success Case: AgentFlow w/ Flow-GRPO",
      steps: [
        {
          title: "Action Step 1",
          tool: "Python Coder",
          subgoal: "Calculate time dilation for relativistic travel",
          command: "Use time dilation formula for spacecraft at 0.99999987*c",
          result: "Correctly identified need for distance and proper time calculation",
          type: "success"
        },
        {
          title: "Action Step 2",
          tool: "Python Coder",
          subgoal: "Convert final result to years",
          command: "Convert travel time to years format",
          result: "Result aligns with choice A: 81 years",
          type: "success"
        }
      ],
      verifier: "PASS, STOP",
      solution: "Correct physics approach - properly calculated relativistic travel time considering distance and time dilation effects. Therefore, the correct choice is: A. 81 years."
    },
    failure: {
      title: "Failure Case: AgentFlow w/o Flow-GRPO",
      steps: [
        {
          title: "Action Step 1",
          tool: "Python Coder",
          subgoal: "Calculate time using time dilation formula with astronaut's age as input",
          command: "Calculate time dilation with t=22 years, v=0.99999987*c",
          result: "Time experienced: 1,360,638,100,521.84 seconds",
          type: "error"
        },
        {
          title: "Action Step 2",
          tool: "Python Coder",
          subgoal: "Recalculate with more precise values",
          command: "Recalculate time dilation with precise c value",
          result: "Time for astronaut: 353,765.88 seconds",
          type: "error"
        },
        {
          title: "Action Step 3",
          tool: "Python Coder",
          subgoal: "Convert astronaut's age to Earth years",
          command: "Convert 693792000 seconds to Earth years",
          result: "Astronaut age: approximately 21.98 Earth years",
          type: "error"
        },
        {
          title: "Action Step 4",
          tool: "Python Coder",
          subgoal: "Convert time to Earth years",
          command: "Convert 353765.88 seconds to Earth years",
          result: "Travel time: approximately 0.011210 Earth years",
          type: "error"
        },
        {
          title: "Action Step 5",
          tool: "Python Coder",
          subgoal: "Calculate observer's perspective time",
          command: "Calculate time from Earth observer perspective",
          result: "Observer time: 1,360,638,100,521.84 seconds",
          type: "error"
        },
        {
          title: "Action Step 6",
          tool: "Wikipedia Search",
          subgoal: "Find distance from Large Magellanic Cloud to Earth",
          command: "Search for LMC distance information",
          result: "Distance verification needed for proper calculation",
          type: "warning"
        },
        {
          title: "Action Step 7",
          tool: "Python Coder",
          subgoal: "Final time calculation verification",
          command: "Verify time dilation calculations",
          result: "Final result: approximately 4 days travel time",
          type: "error"
        }
      ],
      verifier: "STOP, Conceptual Error & Inefficient Multi-Step Process",
      solution: "The answer is 0.011210 Earth years. However, the approach incorrectly treated the astronaut's age as travel time, leading to multiple redundant calculations and a fundamentally flawed methodology."
    }
  },
  7: {
    title: "2WikiMultihopQA - Case 1",
    question: "Who is the mother-in-law of Olivera Despina?",
    answer: "Gülçiçek Hatun",
    success: {
      title: "Success Case: AgentFlow w/ Flow-GRPO",
      steps: [
        {
          title: "Action Step 1",
          tool: "Google Search",
          subgoal: "Search for 'Olivera Despina mother-in-law' to find family relations",
          command: "Search with citations enabled",
          result: "Found Gülçiçek Hatun as mother of Sultan Bayezid I",
          type: "success"
        },
        {
          title: "Action Step 2",
          tool: "Wikipedia Search",
          subgoal: "Verify Gülçiçek Hatun's marriage information",
          command: "Search Ottoman imperial consorts",
          result: "Confirmed relationship through multiple sources",
          type: "success"
        },
        {
          title: "Action Step 3",
          tool: "Web Search",
          subgoal: "Cross-verify family relationships",
          command: "Query Ottoman family tree",
          result: "Final confirmation of Gülçiçek Hatun as answer",
          type: "success"
        }
      ],
      verifier: "PASS, STOP",
      solution: "Multi-tool verification approach successfully identified Gülçiçek Hatun as Olivera Despina's mother-in-law through systematic research."
    },
    failure: {
      title: "Failure Case: AgentFlow w/o Flow-GRPO",
      steps: [
        {
          title: "Action Step 1",
          tool: "Wikipedia Search",
          subgoal: "Retrieve Wikipedia page for Olivera Despina and extract spouse/mother-in-law information",
          command: "Invalid response type",
          result: "Timeout error and empty results",
          type: "error"
        },
        {
          title: "Action Step 2",
          tool: "Google Search",
          subgoal: "Retrieve Google pages for Olivera Despina and extract spouse/mother-in-law information",
          command: "Invalid response type",
          result: "Timeout error and empty results",
          type: "error"
        }
      ],
      verifier: "STOP - No useful information gathered",
      solution: "Tool attempt failed, requiring fallback to alternative research methods. Process terminated prematurely due to technical issues."
    }
  }
};

// Initialize case visualization
document.addEventListener('DOMContentLoaded', function() {
  let currentCase = 1;
  let currentView = 'success'; // 'success' or 'failure'

  const container = document.getElementById('case-visualization-container');

  // Create example selection buttons
  const buttonsContainer = document.querySelector('.case-example-buttons');
  if (buttonsContainer) {
    Object.keys(caseData).forEach(caseId => {
      const btn = document.createElement('button');
      btn.className = 'button is-info is-outlined example-button';
      btn.setAttribute('data-case', caseId);
      btn.textContent = caseData[caseId].title;
      btn.addEventListener('click', () => selectCase(caseId));
      buttonsContainer.appendChild(btn);
    });
  }

  function selectCase(caseId) {
    currentCase = caseId;
    // Update button states
    document.querySelectorAll('.example-button').forEach(btn => {
      btn.classList.remove('is-active');
      if (btn.getAttribute('data-case') == caseId) {
        btn.classList.add('is-active');
      }
    });
    renderCase();
  }

  function toggleView(view) {
    currentView = view;
    document.querySelectorAll('.case-toggle-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`.case-toggle-btn[data-view="${view}"]`).classList.add('active');
    renderCase();
  }

  function renderCase() {
    const caseInfo = caseData[currentCase];
    const viewData = currentView === 'success' ? caseInfo.success : caseInfo.failure;
    const isSuccess = currentView === 'success';

    const html = `
      <div class="case-container">
        <div class="case-main-layout">
          <!-- Left Sidebar -->
          <div class="case-sidebar">
            <div class="case-question-box">
              <h3>Question</h3>
              <div class="question-text">${caseInfo.question}</div>
              <div class="answer-text"><strong>Answer:</strong> ${caseInfo.answer}</div>
            </div>

            <div class="case-toggle-container">
              <button class="case-toggle-btn success-btn ${currentView === 'success' ? 'active' : ''}"
                      data-view="success" onclick="window.caseViz.toggleView('success')">
                ✓ With Flow-GRPO
              </button>
              <button class="case-toggle-btn failure-btn ${currentView === 'failure' ? 'active' : ''}"
                      data-view="failure" onclick="window.caseViz.toggleView('failure')">
                ✗ Without Flow-GRPO
              </button>
            </div>
          </div>

          <!-- Right Content -->
          <div class="case-content">
            <div class="case-display-box ${isSuccess ? 'success' : 'failure'}">
              <h4>${viewData.title}</h4>

              ${viewData.steps.map((step, index) => `
                <div class="action-step" data-step-index="${index}">
                  <div class="action-step-header">
                    <div class="action-step-left">
                      <div class="step-number">${index + 1}</div>
                      <h5>${step.title}</h5>
                    </div>
                    <div class="step-toggle-icon">▼</div>
                  </div>
                  <div class="action-step-content">
                    <div class="action-step-right">
                      <div class="step-detail-box">
                        <div class="step-item">
                          <span class="step-label">Tool:</span>
                          <span class="tool-name">${step.tool}</span>
                        </div>
                        <div class="step-item">
                          <span class="step-label">Sub-goal:</span>
                          <span class="step-content">${step.subgoal}</span>
                        </div>
                        <div class="step-item">
                          <span class="step-label">Command:</span>
                          <span class="step-content">${step.command}</span>
                        </div>
                        <div class="step-item">
                          <span class="step-label">Result:</span>
                          <span class="step-content ${
                            step.type === 'error' ? 'result-error' :
                            step.type === 'success' ? 'result-success' :
                            'result-warning'
                          }">${step.result}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}

              <div class="verifier-box">
                <strong>Execution Verifier:</strong> ${viewData.verifier}
              </div>

              <div class="solution-box">
                <h5>Solution Generator</h5>
                <p>${viewData.solution}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;

    // Add click handlers for accordion functionality
    const stepHeaders = container.querySelectorAll('.action-step-header');
    stepHeaders.forEach((header, index) => {
      header.addEventListener('click', function() {
        const step = this.closest('.action-step');
        const wasExpanded = step.classList.contains('expanded');

        // Toggle expanded class
        if (wasExpanded) {
          step.classList.remove('expanded');
        } else {
          step.classList.add('expanded');
        }
      });
    });

    // Expand first step by default
    const firstStep = container.querySelector('.action-step');
    if (firstStep) {
      firstStep.classList.add('expanded');
    }
  }

  // Expose functions to global scope
  window.caseViz = {
    selectCase,
    toggleView
  };

  // Initialize with first case
  selectCase(1);
});
