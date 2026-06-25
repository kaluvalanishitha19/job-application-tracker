import os
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

load_dotenv()

_llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0.3,
    api_key=os.getenv("OPENAI_API_KEY"),
)

_keyword_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an assistant that extracts key technical skills and "
               "requirements from job descriptions. Return only a comma-separated "
               "list of the 8-10 most important keywords, no extra text."),
    ("human", "{job_description}"),
])

_summary_prompt = ChatPromptTemplate.from_messages([
    ("system", "You summarize job descriptions into 2-3 concise sentences covering "
               "the role's core responsibilities and the seniority level expected."),
    ("human", "{job_description}"),
])

_interview_prep_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a career coach. Given a job description, generate 3 likely "
               "interview questions a candidate should prepare for, with a one-sentence "
               "note on what each question is really assessing. Keep it concise."),
    ("human", "{job_description}"),
])


async def extract_keywords(job_description: str) -> str:
    chain = _keyword_prompt | _llm
    result = await chain.ainvoke({"job_description": job_description})
    return result.content


async def summarize_job_description(job_description: str) -> str:
    chain = _summary_prompt | _llm
    result = await chain.ainvoke({"job_description": job_description})
    return result.content


async def generate_interview_prep(job_description: str) -> str:
    chain = _interview_prep_prompt | _llm
    result = await chain.ainvoke({"job_description": job_description})
    return result.content